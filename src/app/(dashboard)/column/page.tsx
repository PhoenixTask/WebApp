"use client";

import { useMemo, useState, useEffect } from "react";
import useActiveState from "@/store/useActiveState";
import { useBoardsAndTasks, useEditOrderBoard } from "@/hooks/useBoards";
import {
  useEditTasksBoardAndOrderType,
  useEditTaskOrder,
} from "@/hooks/useTasks";
import { Button } from "@/components/UI";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import BoardColumn from "./components/BoardColumn";
import TaskBox from "./components/BoardColumn/TaskBox";
import { NO_BOARD_MSG, NO_PROJECT_MSG } from "@/constants";
import useModal from "@/store/useModal";
import clsx from "clsx";
import { BoardAndTasksType, BoardAndTasksV2Type } from "@/types/board";
import { TaskWithBoardIdType } from "@/types/task";

export default function ColumnViewPage() {
  const { activeWorkspaceId, activeProjectId } = useActiveState();
  const { data: boardsAndTasks } = useBoardsAndTasks(activeProjectId);
  const { mutateAsync: EditBoardOrderAPI } = useEditOrderBoard();
  const { mutateAsync: EditTaskOrderAPI } = useEditTaskOrder();
  const { mutateAsync: EditTasksBoardAndOrderAPI } =
    useEditTasksBoardAndOrderType();
  const { openModal } = useModal();

  const [boardsAndTasksData, setBoardsAndTasksData] = useState<
    BoardAndTasksType[]
  >([]);
  const [tasks, setTasks] = useState<TaskWithBoardIdType[]>([]);

  const [dragStartBoard, setDragStartBoard] =
    useState<BoardAndTasksV2Type | null>(null);
  const [dragStartTask, setDragStartTask] =
    useState<TaskWithBoardIdType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const boardsId = useMemo(
    () => boardsAndTasksData.map((board) => board.id),
    [boardsAndTasksData]
  );

  useEffect(() => {
    if (!boardsAndTasks?.data) return;

    const boards = boardsAndTasks.data;
    setBoardsAndTasksData(boards);

    const allTasks = boards.flatMap((board) =>
      board.taskResponses.map((task) => ({
        ...task,
        boardId: board.id,
      }))
    );

    setTasks(allTasks);
  }, [boardsAndTasks]);

  if (!activeProjectId || !activeWorkspaceId) {
    return (
      <div className="px-2.5 w-full flex flex-col items-center gap-2">
        <p className="m-auto">{NO_PROJECT_MSG}</p>
      </div>
    );
  }

  if (boardsAndTasksData.length === 0) {
    return (
      <div className="px-2.5 w-full flex flex-col items-center gap-5">
        <Button
          onClick={() => openModal("create-board")}
          variant="outline"
          size="small"
        >
          ایجاد ستون
        </Button>
        <p className="m-auto">{NO_BOARD_MSG}</p>
      </div>
    );
  }

  return (
    <div className="flex gap-4 min-h-[79vh] overflow-x-scroll overflow-y-hidden p-2">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <SortableContext
          items={boardsId}
          strategy={horizontalListSortingStrategy}
        >
          {boardsAndTasksData.map((board) => (
            <BoardColumn
              key={board.id}
              {...board}
              tasks={tasks.filter((task) => task.boardId === board.id)}
            />
          ))}
        </SortableContext>

        <DragOverlay>
          {dragStartBoard && <BoardColumn {...dragStartBoard} />}
          {dragStartTask && <TaskBox {...dragStartTask} />}
        </DragOverlay>
      </DndContext>

      <Button
        onClick={handleCreateBoard}
        variant="secondary"
        className={clsx(
          "shadow-[0px_2px_4px_0px_#00000066,_0px_7px_6px_-3px_#0000004D,_inset_0px_-3px_0px_0px_#00000033]",
          "w-64 h-12"
        )}
      >
        ایجاد ستون
      </Button>
    </div>
  );

  function handleCreateBoard() {
    openModal("create-board");
  }

  function onDragStart(event: DragStartEvent) {
    const type = event.active.data.current?.type;

    if (type === "Board") {
      setDragStartBoard(event.active.data.current?.Board);
    }

    if (type === "Task") {
      setDragStartTask(event.active.data.current?.Task);
    }
  }

  async function onDragEnd(event: DragEndEvent) {
    setDragStartBoard(null);
    setDragStartTask(null);

    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    if (activeType === "Board" && overType === "Board") {
      const oldIndex = boardsAndTasksData.findIndex((b) => b.id === active.id);
      const newIndex = boardsAndTasksData.findIndex((b) => b.id === over.id);
      if (oldIndex < 0 || newIndex < 0) return;

      const newOrder = arrayMove(boardsAndTasksData, oldIndex, newIndex);
      setBoardsAndTasksData(newOrder);

      const sendOrder = newOrder.map(({ id }, index) => ({
        id,
        order: index + 1,
      }));

      await EditBoardOrderAPI({
        boards: sendOrder,
      });
    }

    if (activeType === "Task" && overType === "Task") {
      const activeTask = active.data.current;
      const overTask = over.data.current;

      // move task to the same board
      if (activeTask?.Task?.boardId === overTask?.Task?.boardId) {
        setTasks((prev) => {
          const newTasks = arrayMove(
            prev,
            activeTask?.sortable?.index,
            overTask?.sortable?.index
          );

          return newTasks;
        });

        EditTaskOrderAPI({
          taskId: activeTask?.Task?.id,
          order: overTask?.Task?.order,
        });
      }

      // move task to another board
      if (activeTask?.Task?.boardId !== overTask?.Task?.boardId) {
        console.log("test");

        setTasks((prev) => {
          const activeTaskIndex = prev.findIndex(
            (task) => task.id === activeTask?.Task?.id
          );
          const overTaskIndex = prev.findIndex(
            (task) => task.id === overTask?.Task?.id
          );

          if (activeTaskIndex < 0 || overTaskIndex < 0) return prev;

          const updatedTasks = [...prev];

          updatedTasks[activeTaskIndex] = {
            ...updatedTasks[activeTaskIndex],
            boardId: updatedTasks[overTaskIndex].boardId,
          };

          const reorderedTasks = arrayMove(
            updatedTasks,
            activeTaskIndex,
            overTaskIndex
          ).map((task, index) => ({
            ...task,
            order: index + 1,
          }));

          EditTasksBoardAndOrderAPI({
            taskRequests: reorderedTasks.map((task) => ({
              taskId: task.id,
              boardId: task.boardId,
              order: task.order,
            })),
          });

          return reorderedTasks;
        });
      }
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    if (activeType !== "Task") return;

    const activeTask = active.data.current?.Task;

    if (!activeTask) return;

    if (overType === "Task") {
      const overTask = over.data.current?.Task;

      if (!overTask) return;

      const activeBoardId = activeTask.boardId;
      const overBoardId = overTask.boardId;

      if (activeBoardId !== overBoardId) {
        setTasks((prev) => {
          const activeIndex = prev.findIndex((t) => t.id === activeTask.id);
          const overIndex = prev.findIndex((t) => t.id === overTask.id);

          if (activeIndex < 0 || overIndex < 0) return prev;

          const updatedTasks = [...prev];

          updatedTasks[activeIndex] = {
            ...updatedTasks[activeIndex],
            boardId: overBoardId,
          };

          const moved = arrayMove(updatedTasks, activeIndex, overIndex);

          return moved;
        });
      }
    }

    if (overType === "Board") {
      const overBoardId = String(over.id);

      setTasks((prev) => {
        const activeIndex = prev.findIndex((t) => t.id === activeTask.id);

        if (activeIndex < 0) return prev;

        const updatedTasks = [...prev];

        updatedTasks[activeIndex] = {
          ...updatedTasks[activeIndex],
          boardId: overBoardId,
        };

        // for re-render
        return arrayMove(updatedTasks, activeIndex, activeIndex);
      });
    }
  }
}

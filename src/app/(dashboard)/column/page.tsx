"use client";

import { useMemo, useState, useEffect, act } from "react";
import useActiveState from "@/store/useActiveState";
import { useBoardsAndTasks, useEditOrderBoard } from "@/hooks/useBoards";
import { useEditTaskBoard, useEditTaskOrder } from "@/hooks/useTasks";
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
import { BoardAndTasksType } from "@/types/board";
import { TaskType, FlatTaskType } from "@/types/task";

export default function ColumnViewPage() {
  const { activeWorkspaceId, activeProjectId } = useActiveState();
  const { data: boardsAndTasks } = useBoardsAndTasks(activeProjectId);
  const { mutateAsync: EditBoardOrderAPI } = useEditOrderBoard();
  const { mutateAsync: EditTaskOrderAPI } = useEditTaskOrder();
  const { mutateAsync: EditTaskBoardAPI } = useEditTaskBoard();
  const { openModal } = useModal();

  const [boardsAndTasksData, setBoardsAndTasksData] = useState<
    BoardAndTasksType[]
  >([]);
  const [tasksData, setTasksData] = useState<FlatTaskType[]>([]);

  const [dragStartBoard, setDragStartBoard] =
    useState<BoardAndTasksType | null>(null);
  const [dragStartTask, setDragStartTask] = useState<TaskType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  useEffect(() => {
    if (boardsAndTasks) {
      setBoardsAndTasksData(boardsAndTasks.data);
    }

    const flatTasks = boardsAndTasksData.flatMap((board) =>
      board.taskResponses.map((task) => ({
        taskId: task.id,
        boardId: board.id,
        order: task.order,
      }))
    );

    setTasksData(flatTasks);
  }, [boardsAndTasks]);

  const boardsId = useMemo(
    () => boardsAndTasksData.map((board) => board.id),
    [boardsAndTasksData]
  );

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
            <BoardColumn key={board.id} {...board} />
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
    const { active, over } = event;
    setDragStartBoard(null);
    setDragStartTask(null);

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

      // todo: delete this in the end
      console.log("active", activeTask);
      console.log("over", overTask);

      if (
        activeTask?.Task?.boardId === undefined ||
        overTask?.Task?.boardId === undefined
      )
        return;

      if (activeTask?.Task?.boardId === overTask?.Task?.boardId) {
        setBoardsAndTasksData((prev) => {
          const newTasks = prev.map((board) => {
            if (board.id !== activeTask?.Task?.boardId) return board;

            return {
              ...board,
              taskResponses: [
                ...arrayMove(
                  board.taskResponses,
                  activeTask?.sortable?.index,
                  overTask?.sortable?.index
                ),
              ].map((task, index) => ({
                ...task,
                order: index + 1,
              })),
            };
          });

          return newTasks;
        });

        EditTaskOrderAPI({
          taskId: activeTask?.Task?.id,
          order: overTask?.Task?.order,
        });
      } else {
        // جابجایی تسک بین دو ستون
      }
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    if (activeType === "Task" && overType === "Task") {
      const activeTask = active.data.current?.Task;
      const overTask = over.data.current?.Task;

      const activeBoardId = active.data.current?.Task?.boardId;
      const overBoardId = over.data.current?.Task?.boardId;

      // نمایش سایه‌ی تسک در ستون دیگر
      if (activeBoardId !== overBoardId) {
        
      }

      if (!activeTask || !overTask || !activeBoardId || !overBoardId) return;
    }
  }
}

"use client";

import { useMemo, useState, useEffect } from "react";
import useActiveState from "@/store/useActiveState";
import { useBoardsAndTasks, useEditOrderBoard } from "@/hooks/useBoards";
import { useEditTaskOrder, useEditTaskBoard } from "@/hooks/useTasks";
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
import { TaskType } from "@/types/task";

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

    if (activeType === "Board") {
      const oldIndex = boardsAndTasksData.findIndex((b) => b.id === active.id);
      const newIndex = boardsAndTasksData.findIndex((b) => b.id === over.id);
      if (oldIndex < 0 || newIndex < 0) return;

      const newOrder = arrayMove(boardsAndTasksData, oldIndex, newIndex);
      setBoardsAndTasksData(newOrder);

      await EditBoardOrderAPI({
        boardId: active.id as string,
        order: newIndex,
      });
    }

    if (activeType === "Task") {
      const activeTask = active.data.current?.Task;
      const sourceBoardId = active.data.current?.sourceBoardId;
      const destBoardId = over.data.current?.boardId;

      if (!activeTask || !sourceBoardId || !destBoardId) return;

      if (sourceBoardId !== destBoardId) {
        const sourceBoard = boardsAndTasksData.find(
          (b) => b.id === sourceBoardId
        );
        const destBoard = boardsAndTasksData.find((b) => b.id === destBoardId);
        if (!sourceBoard || !destBoard) return;

        const taskToMove = activeTask;
        const updatedSourceTasks = sourceBoard.taskResponses.filter(
          (t) => t.id !== taskToMove.id
        );
        const updatedDestTasks = [
          ...destBoard.taskResponses,
          { ...taskToMove, boardId: destBoardId },
        ];

        const updatedBoards = boardsAndTasksData.map((board) => {
          if (board.id === sourceBoardId)
            return { ...board, tasks: updatedSourceTasks };
          if (board.id === destBoardId)
            return { ...board, tasks: updatedDestTasks };
          return board;
        });

        setBoardsAndTasksData(updatedBoards);

        await EditTaskBoardAPI({
          taskId: taskToMove.id,
          boardId: destBoardId,
        });
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

      if (!activeTask || !overTask || !activeBoardId || !overBoardId) return;

      const sourceBoard = boardsAndTasksData.find(
        (b) => b.id === activeBoardId
      );
      const targetBoard = boardsAndTasksData.find((b) => b.id === overBoardId);

      if (!sourceBoard || !targetBoard) return;

      const activeIndex = sourceBoard.taskResponses.findIndex(
        (t) => t.id === activeTask.id
      );
      const overIndex = targetBoard.taskResponses.findIndex(
        (t) => t.id === overTask.id
      );

      setBoardsAndTasksData((boardsAndTasksData) => {
        return boardsAndTasksData.map((board) => {
          return {
            ...board,
            taskResponses: arrayMove(
              board.taskResponses,
              activeIndex,
              overIndex
            ),
          };
        });
      });

      EditTaskOrderAPI({
        taskId: activeTask.id,
        order: overTask.order,
      });
    }
  }
}

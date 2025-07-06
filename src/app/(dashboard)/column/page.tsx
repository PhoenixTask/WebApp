"use client";

import useActiveState from "@/store/useActiveState";
import { useBoardsAndTasks } from "@/hooks/useBoards";
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
import { useMemo, useState } from "react";
import clsx from "clsx";
import { BoardsAndTasksType } from "@/types/board";
import { TaskType } from "@/types/task";

export default function ColumnViewPage() {
  const { activeWorkspaceId, activeProjectId } = useActiveState();

  const { data: boardsAndTasks } = useBoardsAndTasks(activeProjectId);

  const { openModal } = useModal();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const boardsId = useMemo(
    () => boardsAndTasks?.data.map((board) => board.id) || [],
    [boardsAndTasks]
  );

  const [dragStartBoard, setDragStartBoard] =
    useState<BoardsAndTasksType | null>(null);

  const [dragStartTask, setDragStartTask] = useState<TaskType | null>();

  if (!activeProjectId || !activeWorkspaceId) {
    return (
      <div className="px-2.5 w-full flex flex-col items-center gap-2">
        <div className="m-auto">
          <p>{NO_PROJECT_MSG}</p>
        </div>
      </div>
    );
  }

  if (boardsAndTasks?.data.length === 0) {
    return (
      <div className="px-2.5 w-full flex flex-col items-center gap-5">
        <div className="m-auto">
          <p>{NO_BOARD_MSG}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 min-h-[79vh] overflow-x-scroll overflow-y-hidden p-2">
      <DndContext sensors={sensors}>
        <SortableContext
          items={boardsId}
          strategy={horizontalListSortingStrategy}
        >
          {boardsAndTasks?.data.map((boardsAndTasks) => (
            <BoardColumn key={boardsAndTasks.id} {...boardsAndTasks} />
          ))}
        </SortableContext>
        <DragOverlay dropAnimation={null}>
          {/* {dragStartBoard && <BoardColumn {...dragStartBoard} />} */}
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
    if (event.active.data.current?.type === "Board") {
      setDragStartBoard(event.active.data.current?.Board);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setDragStartTask(event.active.data.current?.Task as TaskType);
      return;
    }
  }

  async function onDragEnd(event: DragEndEvent) {
    setDragStartBoard(null);
    setDragStartTask(null);

    const { active, over } = event;

    if (!over || active.id! === over.id) return;
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over || active.id! === over.id) return;

    const activeTaskType = active.data.current?.type;
    const overTaskType = over.data.current?.type;
  }
}

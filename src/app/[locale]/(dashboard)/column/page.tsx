"use client";

import { useMemo, useState, useEffect } from "react";
import useActiveState from "@/store/useActiveState";
import { useBoards, useEditOrderBoard } from "@/hooks/useBoards";
import { useAllTasksInProject } from "@/hooks/useProjects";
import {
  useEditTasksBoardAndOrderType,
  useEditTasksOrder,
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
import useModal from "@/store/useModal";
import { BoardAndTasksV2Type, BoardType } from "@/types/board";
import { TaskWithBoardIdType } from "@/types/task";
import NoProject from "@/components/NoProject";
import NoBoard from "@/components/NoBoard";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useProtect } from "@/providers/ProtectContext";

export default function ColumnViewPage() {
  const router = useRouter();
  const { isAuthenticated } = useProtect();

  const locale = useLocale();

  const { activeWorkspaceId, activeProjectId } = useActiveState();
  const { data: allTasksInProjectData } = useAllTasksInProject(activeProjectId);
  const { data: boardsData } = useBoards(activeProjectId);
  const { mutate: EditBoardOrderAPI } = useEditOrderBoard();
  const { mutate: EditTasksOrderAPI } = useEditTasksOrder();
  const { mutate: EditTasksBoardAndOrderAPI } = useEditTasksBoardAndOrderType();
  const { openModal } = useModal();

  const t = useTranslations("Dashboard");

  const [boards, setBoards] = useState<BoardType[]>([]);
  const [tasks, setTasks] = useState<TaskWithBoardIdType[]>([]);
  const [originalTaskBoardId, setOriginalTaskBoardId] = useState<string | null>(
    null
  );

  const [dragStartBoard, setDragStartBoard] =
    useState<BoardAndTasksV2Type | null>(null);
  const [dragStartTask, setDragStartTask] =
    useState<TaskWithBoardIdType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const boardsId = useMemo(() => boards.map((board) => board.id), [boards]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/${locale}/login`);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (!allTasksInProjectData || !boardsData) return;

    setTasks(allTasksInProjectData);
    setBoards(boardsData);
  }, [allTasksInProjectData, boardsData]);

  if (!activeProjectId || !activeWorkspaceId) return <NoProject />;

  if (boards.length === 0) return <NoBoard />;

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
          {boards.map((board) => (
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
        className="w-64 h-12 shadow-elevated"
      >
        {t("newBoard")}
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
      const task = event.active.data.current?.Task;
      setDragStartTask(task);
      // Store original board ID
      setOriginalTaskBoardId(task?.boardId || null);
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // Reset drag states
    setDragStartBoard(null);
    setDragStartTask(null);

    if (!over) {
      setOriginalTaskBoardId(null);
      return;
    }

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    // Handle Board reordering
    if (activeType === "Board" && overType === "Board") {
      setBoards((prev) => {
        const oldIndex = prev.findIndex((b) => b.id === active.id);
        const newIndex = prev.findIndex((b) => b.id === over.id);

        if (oldIndex === newIndex) return prev;

        const newBoards = arrayMove(prev, oldIndex, newIndex).map(
          (board, index) => ({
            ...board,
            order: index + 1,
          })
        );

        EditBoardOrderAPI({
          boards: newBoards.map((board) => ({
            id: board.id,
            order: board.order,
          })),
        });

        return newBoards;
      });

      setOriginalTaskBoardId(null);
      return;
    }

    // Handle Task reordering
    if (activeType === "Task") {
      const activeTask = active.data.current?.Task;

      if (!activeTask || !originalTaskBoardId) {
        setOriginalTaskBoardId(null);
        return;
      }

      setTasks((prev) => {
        const activeTaskIndex = prev.findIndex(
          (task) => task.id === activeTask.id
        );

        if (activeTaskIndex === -1) return prev;

        let targetBoardId = originalTaskBoardId; // Default to original board
        let targetIndex = activeTaskIndex;

        // Determine target board and position
        if (overType === "Task") {
          const overTask = over.data.current?.Task;
          if (overTask) {
            targetBoardId = overTask.boardId;
            const overTaskIndex = prev.findIndex(
              (task) => task.id === overTask.id
            );

            // If same board, place after the target task (below it)
            if (originalTaskBoardId === overTask.boardId) {
              targetIndex = overTaskIndex + 1;
            } else {
              // Different board, place at the target task position
              targetIndex = overTaskIndex;
            }
          }
        } else if (overType === "Board") {
          targetBoardId = String(over.id);
          // Find the last position in target board
          const tasksInTargetBoard = prev.filter(
            (task) =>
              task.boardId === targetBoardId && task.id !== activeTask.id
          );

          if (tasksInTargetBoard.length > 0) {
            const lastTaskInBoard =
              tasksInTargetBoard[tasksInTargetBoard.length - 1];
            targetIndex =
              prev.findIndex((task) => task.id === lastTaskInBoard.id) + 1;
          } else {
            // Empty board - find appropriate position
            targetIndex = prev.length;
          }
        }

        // Create new tasks array with updated positions
        const newTasks = [...prev];
        const taskToMove = {
          ...newTasks[activeTaskIndex],
          boardId: targetBoardId,
        };

        // Remove from current position
        newTasks.splice(activeTaskIndex, 1);

        // Adjust target index if needed (when removing item before target)
        if (targetIndex > activeTaskIndex) {
          targetIndex -= 1;
        }

        // Insert at new position
        newTasks.splice(Math.min(targetIndex, newTasks.length), 0, taskToMove);

        // Recalculate orders
        const finalTasks = newTasks.map((task, index) => ({
          ...task,
          order: index + 1,
        }));

        // Determine which API to call based on original vs target board
        const movedToDifferentBoard = originalTaskBoardId !== targetBoardId;

        if (movedToDifferentBoard) {
          // Task moved to different board
          EditTasksBoardAndOrderAPI({
            taskRequests: finalTasks.map((task) => ({
              taskId: task.id,
              boardId: task.boardId,
              order: task.order,
            })),
          });
        } else {
          // Task reordered within same board
          EditTasksOrderAPI({
            tasks: finalTasks.map((task) => ({
              id: task.id,
              order: task.order,
            })),
          });
        }

        return finalTasks;
      });
    }

    // Reset original board ID
    setOriginalTaskBoardId(null);
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    if (activeType !== "Task") return;

    const activeTask = active.data.current?.Task;
    if (!activeTask || !originalTaskBoardId) return;

    // Handle visual feedback for cross-board moves
    if (overType === "Task") {
      const overTask = over.data.current?.Task;
      if (!overTask) return;

      const overBoardId = overTask.boardId;

      // Only update state for cross-board moves
      if (originalTaskBoardId !== overBoardId) {
        setTasks((prev) => {
          const activeIndex = prev.findIndex((t) => t.id === activeTask.id);
          const overIndex = prev.findIndex((t) => t.id === overTask.id);

          if (activeIndex === -1 || overIndex === -1) return prev;

          const updatedTasks = [...prev];
          updatedTasks[activeIndex] = {
            ...updatedTasks[activeIndex],
            boardId: overBoardId,
          };

          return arrayMove(updatedTasks, activeIndex, overIndex);
        });
      }
    }

    if (overType === "Board") {
      const overBoardId = String(over.id);

      // Only update if moving to different board
      if (originalTaskBoardId !== overBoardId) {
        setTasks((prev) => {
          const activeIndex = prev.findIndex((t) => t.id === activeTask.id);
          if (activeIndex === -1) return prev;

          const updatedTasks = [...prev];
          updatedTasks[activeIndex] = {
            ...updatedTasks[activeIndex],
            boardId: overBoardId,
          };

          // Move to end of target board visually
          const targetBoardTasks = prev.filter(
            (task) => task.boardId === overBoardId && task.id !== activeTask.id
          );

          if (targetBoardTasks.length === 0) {
            // Empty board
            return updatedTasks;
          } else {
            // Move to end of target board
            const lastTaskIndex = prev.findIndex(
              (task) =>
                task.id === targetBoardTasks[targetBoardTasks.length - 1].id
            );
            return arrayMove(updatedTasks, activeIndex, lastTaskIndex);
          }
        });
      }
    }
  }
}

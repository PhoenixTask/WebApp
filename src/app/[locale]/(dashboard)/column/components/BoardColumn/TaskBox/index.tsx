"use client";

import { Button, Icon } from "@/components/UI";
import { TaskWithBoardIdType } from "@/types/task";
import clsx from "clsx";
import { useState } from "react";
import useActiveState from "@/store/useActiveState";
import useModal from "@/store/useModal";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useCompleteTask } from "@/hooks/useTasks";

type TaskBoxProps = TaskWithBoardIdType;

export default function TaskBox({
  boardId,
  id,
  name,
  deadLine,
  priority,
  description,
  order,
}: TaskBoxProps) {
  const [show, setShow] = useState(false);
  const { storeActiveTask } = useActiveState();
  const { openModal } = useModal();

  const { mutate: CompleteTaskAPI } = useCompleteTask();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: "Task",
      Task: { id, name, deadLine, priority, description, order, boardId },
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="rounded-3xl p-3 min-h-30 bg-base-100 flex flex-col justify-between opacity-30 shadow-elevated dark:border dark:shadow-elevated-dark"
      >
        <div>{name}</div>

        <div className="overflow-hidden border-t border-neutral transition-all duration-300">
          <div className="flex justify-end">
            <Button
              variant="ghost"
              onClick={handleEditTask}
              className="text-neutral hover:text-warning"
            >
              <Icon iconName="Edit" />
            </Button>
            <Button
              variant="ghost"
              onClick={handleDeleteTask}
              className="text-neutral hover:text-error"
            >
              <Icon iconName="Remove" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className="rounded-3xl p-3 min-h-30 bg-base-100 flex flex-col justify-between shadow-elevated dark:border"
    >
      <div>{name}</div>

      <div
        className={clsx(
          "overflow-hidden border-t border-neutral transition-all duration-300 flex justify-between items-center",
          show ? "max-h-16 pt-1" : "max-h-0 pt-0"
        )}
      >
        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={handleEditTask}
            className="text-neutral hover:text-warning"
          >
            <Icon iconName="Edit" />
          </Button>
          <Button
            variant="ghost"
            onClick={handleDeleteTask}
            className="text-neutral hover:text-error"
          >
            <Icon iconName="Remove" />
          </Button>
        </div>
        <input
          type="checkbox"
          onClick={() => handleCompleteTask(id)}
          className="checkbox"
        />
      </div>
    </div>
  );

  function handleCompleteTask(taskId: string) {
    CompleteTaskAPI({ id: taskId, isComplete: true });
  }

  function handleDeleteTask() {
    storeActiveTask(id);
    openModal("delete-task");
  }

  function handleEditTask() {
    storeActiveTask(id);
    openModal("edit-task");
  }
}

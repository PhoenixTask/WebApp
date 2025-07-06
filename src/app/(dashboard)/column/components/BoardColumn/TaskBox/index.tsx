"use client";

import Icon from "@/components/Icon";
import { Button } from "@/components/UI";
import { TaskType } from "@/types/task";
import clsx from "clsx";
import { useState } from "react";
import useActiveState from "@/store/useActiveState";
import useModal from "@/store/useModal";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskBox({
  id,
  name,
  deadLine,
  priority,
  description,
  order,
}: TaskType) {
  const [show, setShow] = useState(false);
  const { storeActiveTask } = useActiveState();
  const { openModal } = useModal();

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
      Task: { id, name, deadLine, priority, description, order },
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
        className={clsx(
          "shadow-[0px_2px_4px_0px_#00000066,_0px_7px_6px_-3px_#0000004D,_inset_0px_-3px_0px_0px_#00000033]",
          "rounded-3xl p-3 min-h-30 bg-base-100 flex flex-col justify-between opacity-30"
        )}
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
      className={clsx(
        "shadow-[0px_2px_4px_0px_#00000066,_0px_7px_6px_-3px_#0000004D,_inset_0px_-3px_0px_0px_#00000033]",
        "rounded-3xl p-3 min-h-30 bg-base-100 flex flex-col justify-between"
      )}
    >
      <div>{name}</div>

      <div
        className={clsx(
          "overflow-hidden border-t border-neutral transition-all duration-300",
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
      </div>
    </div>
  );

  function handleDeleteTask() {
    storeActiveTask(id);
    openModal("delete-task");
  }

  function handleEditTask() {
    storeActiveTask(id);
    openModal("edit-task");
  }
}

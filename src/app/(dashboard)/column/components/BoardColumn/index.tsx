import { useMemo, useState } from "react";
import TaskBox from "./TaskBox";
import clsx from "clsx";
import { colorVariant } from "@/functions/colorInterpretation";
import { useSortable } from "@dnd-kit/sortable";
import { SortableContext } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Flex } from "@/components/UI";
import useActiveState from "@/store/useActiveState";
import useModal from "@/store/useModal";
import { BoardAndTasksType } from "@/types/board";

export default function BoardColumn({
  id,
  name,
  color,
  taskResponses,
}: BoardAndTasksType) {
  taskResponses = taskResponses.sort((a, b) => a.order! - b.order!);

  const [show, setShow] = useState(false);

  const { storeActiveBoard } = useActiveState();
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
      type: "Board",
      Board: { id, name, color, taskResponses },
    },
  });

  const tasksId = useMemo(
    () => taskResponses.map((task) => task.id),
    [taskResponses]
  );

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div className="space-y-4" style={style} ref={setNodeRef}>
        <div
          {...attributes}
          {...listeners}
          className={clsx(
            "w-64 p-3 border-t-2 rounded-3xl cursor-pointer opacity-20",
            colorVariant(color).border
          )}
        />
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className="space-y-4"
      style={style}
      ref={setNodeRef}
    >
      <Flex
        {...attributes}
        {...listeners}
        justifyContent="between"
        className={clsx(
          "shadow-[0px_2px_4px_0px_#00000066,_0px_7px_6px_-3px_#0000004D,_inset_0px_-3px_0px_0px_#00000033]",
          "w-64 p-3 rounded-3xl border-t-2 cursor-pointer bg-base-100",
          colorVariant(color).border
        )}
      >
        <span>{name}</span>
        <Flex alignItems="center" gap="XS" className="w-11">
          <Button
            mode="warning-bubble"
            className="w-5 h-5 border-2 border-base-100"
            onClick={() => handleEditBoard(id)}
          />
          <Button
            mode="error-bubble"
            className="w-4 h-4 border-2 border-base-100"
            onClick={() => handleDeleteBoard(id)}
          />
        </Flex>
      </Flex>
      <div className="flex flex-col gap-y-4">
        <SortableContext items={tasksId}>
          {taskResponses.map((task) => (
            <TaskBox key={task.id} {...task} />
          ))}
        </SortableContext>
        <Button
          className={clsx(
            "shadow-[0px_2px_4px_0px_#00000066,_0px_7px_6px_-3px_#0000004D,_inset_0px_-3px_0px_0px_#00000033]",
            !show && "opacity-0"
          )}
          onClick={() => handleCreateTask()}
        >
          ایجاد تسک
        </Button>
      </div>
    </div>
  );

  function handleDeleteBoard(id: string) {
    storeActiveBoard(id);
    openModal("delete-board");
  }

  function handleEditBoard(id: string) {
    storeActiveBoard(id);
    openModal("edit-board");
  }

  function handleCreateTask() {
    storeActiveBoard(id);
    openModal("create-task");
  }
}

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
import { BoardAndTasksV2Type } from "@/types/board";
import { useTranslations } from "next-intl";

type BoardColumnProps = BoardAndTasksV2Type;

export default function BoardColumn({
  id,
  name,
  color,
  order,
  tasks,
}: BoardColumnProps) {
  const [show, setShow] = useState(false);

  const { storeActiveBoard } = useActiveState();
  const { openModal } = useModal();

  const t = useTranslations("Dashboard");

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
      Board: { id, name, color, order, tasks },
    },
  });

  const tasksId = useMemo(() => tasks.map((task) => task.id), [tasks]);

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
          "w-64 p-3 rounded-3xl border-t-2 cursor-pointer bg-base-100 shadow-elevated dark:border-2",
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
          {tasks.map((task) => (
            <TaskBox key={task.id} {...task} />
          ))}
        </SortableContext>
        <Button
          className={clsx("shadow-elevated", !show && "opacity-0")}
          onClick={() => handleCreateTask()}
        >
          {t("newTask")}
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

import { Button, Flex, Icon } from "@/components/UI";
import { colorVariant, priorityColor } from "@/functions/colorInterpretation";
import { useTasks, useCompleteTask } from "@/hooks/useTasks";
import useModal from "@/store/useModal";
import useActiveState from "@/store/useActiveState";
import { useState } from "react";
import { MiladiToShamsi } from "@/functions/date";
import clsx from "clsx";
import { useTranslations } from "next-intl";

type CollapsibleBoardProps = {
  boardName: string;
  boardId: string;
  boardColor: string;
};

export default function CollapsibleBoard({
  boardId,
  boardName,
  boardColor,
}: CollapsibleBoardProps) {
  const t = useTranslations("Dashboard");

  const prioritiesLabel = t("ListPage.priorities").split(",");

  const { storeActiveBoard, storeActiveTask } = useActiveState();

  const { data: tasks } = useTasks(boardId);
  const { mutate: CompleteTaskAPI } = useCompleteTask();
  const { openModal } = useModal();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={clsx(
        "collapse collapse-arrow shadow-sm",
        isOpen && "collapse-open"
      )}
    >
      <Flex
        className={clsx(
          "text-center collapse-title font-semibold text-base-100 rounded-t-lg",
          colorVariant(boardColor).bg
        )}
        onClick={handleClickBoard}
      >
        <Flex alignItems="center" gap="XS" className="w-16">
          <Button
            mode="error-bubble"
            className="w-4 h-4 border-2 border-base-100"
            onClick={(e) => handleDeleteBoard(e, boardId)}
          />
          <Button
            mode="warning-bubble"
            className="w-5 h-5 border-2 border-base-100"
            onClick={(e) => handleEditBoard(e, boardId)}
          />
        </Flex>
        <span className="select-none">{boardName}</span>
      </Flex>
      <Flex
        direction="col"
        gap="S"
        alignItems="center"
        className="collapse-content py-2 bg-base-200"
      >
        <div className="flex flex-col w-full">
          {!tasks || !tasks[0] ? (
            <div className="m-auto mt-2">{t("noTask")}</div>
          ) : (
            <table className="w-full table-fixed border-separate border-spacing-y-2 text-sm text-base-content">
              <thead>
                <tr className="text-base font-semibold text-center">
                  <th className="py-3 px-2 w-20">{t("ListPage.complete")}</th>
                  <th className="py-3 px-2">{t("ListPage.title")}</th>
                  <th className="py-3 px-2">{t("ListPage.priority")}</th>
                  <th className="py-3 px-2">{t("ListPage.deadline")}</th>
                  <th className="py-3 px-2">{t("ListPage.description")}</th>
                  <th className="w-16" />
                </tr>
              </thead>
              <tbody className="text-center">
                {tasks.map(
                  ({
                    id: taskId,
                    name: taskName,
                    priority,
                    deadLine,
                    description,
                    isComplete,
                  }) => (
                    <tr
                      key={taskId}
                      className={clsx(
                        isComplete && "line-through bg-base-300",
                        "shadow-sm rounded-md"
                      )}
                    >
                      <td className="py-2 px-2">
                        <input
                          type="checkbox"
                          defaultChecked={isComplete}
                          onClick={() =>
                            handleCompleteTask(taskId, isComplete!)
                          }
                          className="checkbox"
                        />
                      </td>
                      <td className="py-2 px-2">{taskName}</td>
                      <td className="py-2 px-2">
                        <div className="flex justify-center gap-1">
                          <div
                            className="tooltip"
                            data-tip={prioritiesLabel[priority]}
                          >
                            <Icon
                              className={clsx(
                                "text-xs",
                                priorityColor(priority)
                              )}
                              width={20}
                              iconName="Flag"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-2">{MiladiToShamsi(deadLine)}</td>
                      <td className="py-2 px-2">{description}</td>
                      <td className="py-2 flex gap-2 justify-center items-center">
                        <Button
                          mode="warning-bubble"
                          className="w-5 h-5"
                          onClick={(e) => handleEditTask(e, taskId)}
                        />
                        <Button
                          mode="error-bubble"
                          className="w-4 h-4"
                          onClick={(e) => handleDeleteTask(e, taskId)}
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
        <Button onClick={handleCreateTask}>{t("newTask")}</Button>
      </Flex>
    </div>
  );

  function handleCompleteTask(taskId: string, isComplete: boolean) {
    CompleteTaskAPI({ id: taskId, isComplete: !isComplete });
  }

  function handleClickBoard() {
    storeActiveBoard(boardId);
    setIsOpen(!isOpen);
  }

  function handleCreateTask() {
    storeActiveBoard(boardId);
    openModal("create-task");
  }

  function handleDeleteBoard(e: React.MouseEvent, id: string) {
    storeActiveBoard(id);
    openModal("delete-board");
  }

  function handleEditBoard(e: React.MouseEvent, id: string) {
    storeActiveBoard(id);
    openModal("edit-board");
  }

  function handleDeleteTask(e: React.MouseEvent, id: string) {
    storeActiveTask(id);
    openModal("delete-task");
  }

  function handleEditTask(e: React.MouseEvent, id: string) {
    storeActiveTask(id);
    openModal("edit-task");
  }
}

import { Button, Heading, Modal, Icon } from "@/components/UI";
import { useDeleteTask } from "@/hooks/useTasks";
import useActiveState from "@/store/useActiveState";
import { useTranslations } from "next-intl";

type DeleteTaskModalProps = {
  onClose: () => void;
};

export default function DeleteTaskModal({ onClose }: DeleteTaskModalProps) {
  const { activeTaskId, forgetActiveTask } = useActiveState();
  const { mutateAsync: DeleteTaskAPI } = useDeleteTask();

  const t = useTranslations("Modals.Delete.Task");

  return (
    <Modal onClose={onClose} closeIcon={<Icon iconName="Close" />}>
      <Heading as="h3" align="center" className="mb-4">
        {t("title")}
      </Heading>
      <div className="flex justify-center gap-2 mt-4">
        <Button size="full" variant="outline" onClick={onClose}>
          {t("cancel")}
        </Button>
        <Button size="full" variant="destructive" onClick={handleDelete}>
          {t("confirm")}
        </Button>
      </div>
    </Modal>
  );

  async function handleDelete() {
    DeleteTaskAPI(activeTaskId!);
    forgetActiveTask();
    onClose();
  }
}

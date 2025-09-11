import { Button, Heading, Modal, Icon } from "@/components/UI";
import { useDeleteBoard } from "@/hooks/useBoards";
import useActiveState from "@/store/useActiveState";
import { useTranslations } from "next-intl";

type DeleteBoardModalProps = {
  onClose: () => void;
};

export default function DeleteBoardModal({ onClose }: DeleteBoardModalProps) {
  const { activeBoardId, forgetActiveBoard } = useActiveState();
  const { mutateAsync: DeleteBoardAPI } = useDeleteBoard();

  const t = useTranslations("Modals.Delete.Board");

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
    DeleteBoardAPI(activeBoardId!);
    forgetActiveBoard();
    onClose();
  }
}

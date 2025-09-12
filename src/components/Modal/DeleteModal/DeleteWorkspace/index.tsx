import { Button, Heading, Modal, Icon } from "@/components/UI";
import { useDeleteWorkspace } from "@/hooks/useWorkspaces";
import useActiveState from "@/store/useActiveState";
import { useTranslations } from "next-intl";

type DeleteWorkspaceModalProps = {
  onClose: () => void;
};

export default function DeleteWorkspaceModal({
  onClose,
}: DeleteWorkspaceModalProps) {
  const { activeWorkspaceId, forgetActiveWorkspace } = useActiveState();
  const { mutateAsync: DeleteWorkspaceAPI } = useDeleteWorkspace();
  const t = useTranslations("Modals.Delete.Workspace");

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
    DeleteWorkspaceAPI(activeWorkspaceId!);
    forgetActiveWorkspace();
    onClose();
  }
}

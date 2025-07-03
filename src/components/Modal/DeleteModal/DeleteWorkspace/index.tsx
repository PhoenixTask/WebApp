import Icon from "@/components/Icon";
import { Button, Heading, Modal } from "@/components/UI";
import { useDeleteWorkspace } from "@/hooks/useWorkspaces";
import useActiveState from "@/store/useActiveState";

interface DeleteWorkspaceModalProps {
  onClose: () => void;
}

export default function DeleteWorkspaceModal({
  onClose,
}: DeleteWorkspaceModalProps) {
  const { activeWorkspaceId, forgetActiveWorkspace } = useActiveState();
  const { mutateAsync: DeleteWorkspaceAPI } = useDeleteWorkspace();

  return (
    <Modal onClose={onClose} closeIcon={<Icon iconName="Close" />}>
      <Heading as="h3" align="center" className="mb-4">
        از حذف این میزکار مطمئنی؟
      </Heading>
      <div className="flex justify-center gap-2 mt-4">
        <Button size="full" variant="outline" onClick={onClose}>
          انصراف
        </Button>
        <Button size="full" variant="destructive" onClick={handleDelete}>
          حذف
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

import { Button, Heading, Modal, Icon } from "@/components/UI";
import { useDeleteProject } from "@/hooks/useProjects";
import useActiveState from "@/store/useActiveState";

type DeleteProjectModalProps = {
  onClose: () => void;
};

export default function DeleteProjectModal({
  onClose,
}: DeleteProjectModalProps) {
  const { activeProjectId, forgetActiveProject } = useActiveState();
  const { mutateAsync: DeleteWorkspaceAPI } = useDeleteProject();

  return (
    <Modal onClose={onClose} closeIcon={<Icon iconName="Close" />}>
      <Heading as="h3" align="center" className="mb-4">
        از حذف این پروژه مطمئنی؟
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
    DeleteWorkspaceAPI(activeProjectId!);
    forgetActiveProject();
    onClose();
  }
}

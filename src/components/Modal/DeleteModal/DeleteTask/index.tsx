import Icon from "@/components/Icon";
import { Button, Heading, Modal } from "@/components/UI";
import { useDeleteTask } from "@/hooks/useTasks";
import useActiveState from "@/store/useActiveState";

interface DeleteTaskModalProps {
  onClose: () => void;
}

export default function DeleteTaskModal({ onClose }: DeleteTaskModalProps) {
  const { activeTaskId, storeActiveTask } = useActiveState();
  const { mutateAsync: DeleteTaskAPI } = useDeleteTask();

  return (
    <Modal onClose={onClose} closeIcon={<Icon iconName="Close" />}>
      <Heading as="h3" align="center" className="mb-4">
        از حذف این تسک مطمئنی؟
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
    DeleteTaskAPI(activeTaskId!);
    storeActiveTask(null);
    onClose();
  }
}

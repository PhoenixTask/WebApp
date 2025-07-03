import Icon from "@/components/Icon";
import { Button, Heading, Modal } from "@/components/UI";
import { useDeleteBoard } from "@/hooks/useBoards";
import useActiveState from "@/store/useActiveState";

interface DeleteBoardModalProps {
  onClose: () => void;
}

export default function DeleteBoardModal({ onClose }: DeleteBoardModalProps) {
  const { activeBoardId, storeActiveBoard, storeActiveTask } = useActiveState();
  const { mutateAsync: DeleteBoardAPI } = useDeleteBoard();

  return (
    <Modal onClose={onClose} closeIcon={<Icon iconName="Close" />}>
      <Heading as="h3" align="center" className="mb-4">
        از حذف این ستون مطمئنی؟
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
    DeleteBoardAPI(activeBoardId!);
    storeActiveBoard(null);
    storeActiveTask(null);
    onClose();
  }
}

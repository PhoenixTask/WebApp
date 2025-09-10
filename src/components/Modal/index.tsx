"use client";

import useModal from "@/store/useModal";
import {
  CreateWorkspace,
  CreateProject,
  CreateBoard,
  CreateTask,
  DeleteWorkspace,
  DeleteProject,
  DeleteBoard,
  DeleteTask,
  EditWorkspace,
  EditProject,
  EditBoard,
  EditTask,
} from "./modals";

export default function Modal() {
  const { modalStack, closeModal } = useModal();

  if (modalStack.length === 0) return null;

  const currentModal = modalStack[modalStack.length - 1];

  return <>{renderModal(currentModal.type)}</>;

  function renderModal(modalType: string) {
    switch (modalType) {
      case "create-workspace":
        return <CreateWorkspace onClose={closeModal} />;
      case "create-project":
        return <CreateProject onClose={closeModal} />;
      case "create-board":
        return <CreateBoard onClose={closeModal} />;
      case "create-task":
        return (
          <CreateTask
            onClose={closeModal}
            selectedDate={currentModal.props?.selectedDate}
          />
        );
      case "delete-workspace":
        return <DeleteWorkspace onClose={closeModal} />;
      case "delete-project":
        return <DeleteProject onClose={closeModal} />;
      case "delete-board":
        return <DeleteBoard onClose={closeModal} />;
      case "delete-task":
        return <DeleteTask onClose={closeModal} />;
      case "edit-workspace":
        return <EditWorkspace onClose={closeModal} />;
      case "edit-project":
        return <EditProject onClose={closeModal} />;
      case "edit-board":
        return <EditBoard onClose={closeModal} />;
      case "edit-task":
        return <EditTask onClose={closeModal} />;
      default:
        return null;
    }
  }
}

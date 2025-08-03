import { create } from "zustand";

type ModalType =
  | "create-task"
  | "create-board"
  | "create-project"
  | "create-workspace"
  | "delete-task"
  | "delete-board"
  | "delete-project"
  | "delete-workspace"
  | "edit-task"
  | "edit-board"
  | "edit-project"
  | "edit-workspace";

type ModalStackItem = {
  type: ModalType;
  props?: Record<"selectedDate", Date>;
};

type useModalType = {
  modalStack: ModalStackItem[];

  // setters
  openModal: (type: ModalType, props?: Record<"selectedDate", Date>) => void;
  closeModal: () => void;
};

const useModal = create<useModalType>((set) => ({
  modalStack: [],

  // setters
  openModal: (type, props) =>
    set((state) => ({
      modalStack: [...state.modalStack, { type, props }],
    })),
  closeModal: () =>
    set((state) => ({
      modalStack: state.modalStack.slice(0, -1),
    })),
}));

export default useModal;

import { create } from "zustand";

type useActiveStateType = {
  activeWorkspaceId: string | null;
  activeProjectId: string | null;
  activeBoardId: string | null;
  activeTaskId: string | null;

  // setters
  storeActiveWorkspace: (id: string | null) => void;
  storeActiveProject: (id: string | null) => void;
  storeActiveBoard: (id: string | null) => void;
  storeActiveTask: (id: string | null) => void;

  forgetActiveWorkspace: () => void;
  forgetActiveProject: () => void;
  forgetActiveBoard: () => void;
  forgetActiveTask: () => void;
};

const useActiveState = create<useActiveStateType>((set) => ({
  activeWorkspaceId: null,
  activeProjectId: null,
  activeBoardId: null,
  activeTaskId: null,

  // setters
  storeActiveWorkspace: (id) => set({ activeWorkspaceId: id }),
  storeActiveProject: (id) => set({ activeProjectId: id }),
  storeActiveBoard: (id) => set({ activeBoardId: id }),
  storeActiveTask: (id) => set({ activeTaskId: id }),

  forgetActiveWorkspace: () =>
    set({
      activeWorkspaceId: null,
      activeProjectId: null,
      activeBoardId: null,
      activeTaskId: null,
    }),
  forgetActiveProject: () =>
    set({ activeProjectId: null, activeBoardId: null, activeTaskId: null }),
  forgetActiveBoard: () => set({ activeBoardId: null, activeTaskId: null }),
  forgetActiveTask: () => set({ activeTaskId: null }),
}));

export default useActiveState;

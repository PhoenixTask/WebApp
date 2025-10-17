import { create } from "zustand";

type useLoadingType = {
  isLoading: boolean;

  // setters
  setLoading: (status: boolean) => void;
};

const useLoading = create<useLoadingType>((set) => ({
  isLoading: false,

  // setters
  setLoading: (status) => set({ isLoading: status }),
}));

export default useLoading;

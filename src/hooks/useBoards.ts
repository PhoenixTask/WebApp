import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateBoardAPI,
  GetBoardsAPI,
  DeleteBoardAPI,
  EditBoardAPI,
  EditBoardsOrderAPI,
} from "@/services/board";
import {
  BoardType,
  CreateBoardType,
  EditBoardType,
  EditBoardOrdersType,
} from "@/types/board";
import toast from "react-hot-toast";
import errorToast from "@/functions/errorToast";

export const useBoards = (projectId: string | null) => {
  return useQuery<BoardType[] | []>({
    queryKey: ["boards", projectId],
    queryFn: () => {
      if (projectId === null) {
        return Promise.resolve([]);
      }
      return GetBoardsAPI({ id: projectId });
    },
    staleTime: 1000 * 60 * 5,
    select: (boards) => boards.sort((a, b) => a.order - b.order),
  });
};

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ order, ...data }: CreateBoardType) => {
      const boards =
        queryClient.getQueryData<BoardType[]>(["boards", data.projectId]) ?? [];

      const biggestOrder = Math.max(0, ...boards.map((board) => board.order));

      const newBoard: CreateBoardType = {
        order: biggestOrder + 1,
        ...data,
      };

      return await CreateBoardAPI(newBoard);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      queryClient.invalidateQueries({ queryKey: ["all-tasks-in-project"] });
      toast.success("ستون با موفقیت ایجاد شد.");
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => DeleteBoardAPI({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      queryClient.invalidateQueries({ queryKey: ["all-tasks-in-project"] });
      toast.success("ستون با موفقیت حذف شد.");
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};

export const useEditBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, id }: EditBoardType) => EditBoardAPI({ data, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      queryClient.invalidateQueries({ queryKey: ["all-tasks-in-project"] });
      toast.success("ستون با موفقیت ویرایش شد.");
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};

export const useEditOrderBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EditBoardOrdersType) => EditBoardsOrderAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      queryClient.invalidateQueries({ queryKey: ["all-tasks-in-project"] });
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};

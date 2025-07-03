import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateBoardAPI,
  GetBoardAPI,
  DeleteBoardAPI,
  EditBoardAPI,
} from "@/services/board";
import { BoardType, CreateBoardType, EditBoardType } from "@/types/board";
import toast from "react-hot-toast";
import errorToast from "@/functions/errorToast";

export const useBoards = (projectId: string | null) => {
  return useQuery({
    queryKey: ["boards", projectId],
    queryFn: () => {
      if (projectId === null) {
        return [];
      }
      return GetBoardAPI({ id: projectId });
    },
    staleTime: 1000 * 60 * 5,
    select: (boards) => boards.sort((a, b) => a.order! - b.order!),
  });
};

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ order, ...data }: CreateBoardType) => {
      const boards =
        queryClient.getQueryData<BoardType[]>(["boards", data.projectId]) ?? [];

      const biggestOrder = Math.max(0, ...boards.map((board) => board.order!));

      const newBoard: CreateBoardType = {
        order: biggestOrder + 1,
        ...data,
      };

      return await CreateBoardAPI(newBoard);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      queryClient.invalidateQueries({ queryKey: ["boards-tasks"] });
      toast.success("ستون با موفقیت ایجاد شد.");
    },
    onError: (error) => {
      errorToast(error);
    }
  });
};

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => DeleteBoardAPI({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      queryClient.invalidateQueries({ queryKey: ["boards-tasks"] });
      toast.success("ستون با موفقیت حذف شد.");
    },
    onError: (error) => {
      errorToast(error);
    }
  });
};

export const useEditBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, id }: EditBoardType) => EditBoardAPI({ data, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      queryClient.invalidateQueries({ queryKey: ["boards-tasks"] });
      toast.success("ستون با موفقیت ویرایش شد.");
    },
    onError: (error) => {
      errorToast(error);
    }
  });
};

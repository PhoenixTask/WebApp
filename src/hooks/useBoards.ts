import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateBoardAPI,
  GetBoardAPI,
  GetBoardsAndTasksAPI,
  DeleteBoardAPI,
  EditBoardAPI,
  EditBoardOrderAPI,
} from "@/services/board";
import {
  BoardType,
  BoardsAndTasksType,
  CreateBoardType,
  EditBoardType,
  EditBoardOrdersType,
} from "@/types/board";
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

export const useBoardsAndTasks = (projectId: string | null) => {
  return useQuery({
    queryKey: ["boards-and-tasks", projectId],
    queryFn: (): Promise<BoardsAndTasksType> => {
      if (projectId === null) {
        return Promise.resolve({
          data: [],
          page: 0,
          total: 0,
        });
      }
      return GetBoardsAndTasksAPI({ id: projectId });
    },
    select: (boardsAndTasks) => {
      return {
        data: [...boardsAndTasks.data]
          .sort((a, b) => a.order! - b.order!)
          .map((board) => ({
            ...board,
            taskResponses: [...board.taskResponses].sort(
              (a, b) => a.order! - b.order!
            ),
          })),
        page: boardsAndTasks.page,
        total: boardsAndTasks.total,
      };
    },
    staleTime: 1000 * 60 * 5,
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
      queryClient.invalidateQueries({ queryKey: ["boards-and-tasks"] });
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
      queryClient.invalidateQueries({ queryKey: ["boards-and-tasks"] });
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
      queryClient.invalidateQueries({ queryKey: ["boards-and-tasks"] });
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
    mutationFn: (data: EditBoardOrdersType) => EditBoardOrderAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      queryClient.invalidateQueries({ queryKey: ["boards-and-tasks"] });
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};

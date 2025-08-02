import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateTaskAPI,
  GetTaskAPI,
  DeleteTaskAPI,
  EditTaskAPI,
  EditTaskBoardAPI,
  EditTaskOrderAPI,
  getTasksByDeadlineAPI,
} from "@/services/task";
import {
  CreateTaskType,
  EditTaskType,
  TaskType,
  EditTaskBoardType,
  EditTaskOrderType,
} from "@/types/task";
import toast from "react-hot-toast";
import errorToast from "@/functions/errorToast";
import { DeadlineParams } from "@/types/board";

export const useTasks = (boardId: string) => {
  return useQuery({
    queryKey: ["tasks", boardId],
    queryFn: () => GetTaskAPI({ id: boardId }),
    staleTime: 1000 * 60 * 5,
    select: (tasks) => tasks.sort((a, b) => a.order! - b.order!),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ order, ...data }: CreateTaskType) => {
      const tasks =
        queryClient.getQueryData<TaskType[]>(["tasks", data.boardId]) ?? [];

      const biggestOrder = Math.max(0, ...tasks.map((task) => task.order!));

      const newTask: CreateTaskType = { order: biggestOrder + 1, ...data };

      return await CreateTaskAPI(newTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["boards-and-tasks"] });
      toast.success("تسک با موفقیت ایجاد شد.");
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => DeleteTaskAPI({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["boards-and-tasks"] });
      toast.success("تسک با موفقیت حذف شد.");
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};

export const useEditTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, id }: EditTaskType) => EditTaskAPI({ data, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["boards-and-tasks"] });
      toast.success("تسک با موفقیت ویرایش شد.");
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};

export const useEditTaskBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EditTaskBoardType) => EditTaskBoardAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["boards-and-tasks"] });
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};

export const useEditTaskOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EditTaskOrderType) => EditTaskOrderAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["boards-and-tasks"] });
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};


export const useTasksByDeadline = ({ ProjectId, Start, End }: DeadlineParams) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["tasks-by-deadline", ProjectId, Start, End],
    queryFn: () => {
      if (!ProjectId || !Start || !End) return Promise.resolve([]);
      return getTasksByDeadlineAPI({ ProjectId, Start, End });
    }

  });
};

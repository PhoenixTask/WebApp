import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateTaskAPI,
  GetTasksAPI,
  DeleteTaskAPI,
  EditTaskAPI,
  EditTaskBoardAPI,
  EditTasksOrderAPI,
  GetTasksByDeadlineAPI,
  EditTaskDeadlineAPI,
  EditTasksBoardAndOrderAPI,
  CompleteTaskAPI,
} from "@/services/task";
import {
  CreateTaskType,
  EditTaskType,
  TaskType,
  EditTaskBoardType,
  EditTasksOrderType,
  GetTasksByDeadlineType,
  EditTaskDeadlineType,
  EditTasksBoardAndOrderType,
  CompleteTaskType,
} from "@/types/task";
import { errorToast, successToast, loadingToast } from "@/functions/toast";

export const useTasks = (boardId: string) => {
  const query = useQuery({
    queryKey: ["tasks", boardId],
    queryFn: () => GetTasksAPI({ id: boardId }),
    staleTime: 1000 * 60 * 5,
    select: (tasks) => tasks.sort((a, b) => a.order - b.order),
  });

  // background fetch
  useEffect(() => {
    if (query.isFetching && !query.isPending) {
      loadingToast();
    } else if (!query.isFetching) {
      loadingToast.finish();
    }
  }, [query.isFetching, query.isPending]);

  return query;
};

export const useCompleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CompleteTaskType) => CompleteTaskAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks-by-deadline"] });
      queryClient.invalidateQueries({ queryKey: ["all-tasks-in-project"] });
      successToast("taskUpdated");
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ order, ...data }: CreateTaskType) => {
      const tasks =
        queryClient.getQueryData<TaskType[]>(["tasks", data.boardId]) ?? [];

      const biggestOrder = Math.max(0, ...tasks.map((task) => task.order));

      const newTask: CreateTaskType = { order: biggestOrder + 1, ...data };

      return await CreateTaskAPI(newTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks-by-deadline"] });
      queryClient.invalidateQueries({ queryKey: ["all-tasks-in-project"] });
      successToast("taskCreated");
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
      queryClient.invalidateQueries({ queryKey: ["tasks-by-deadline"] });
      queryClient.invalidateQueries({ queryKey: ["all-tasks-in-project"] });
      successToast("taskDeleted");
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
      queryClient.invalidateQueries({ queryKey: ["tasks-by-deadline"] });
      queryClient.invalidateQueries({ queryKey: ["all-tasks-in-project"] });
      successToast("taskUpdated");
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
      queryClient.invalidateQueries({ queryKey: ["tasks-by-deadline"] });
      queryClient.invalidateQueries({ queryKey: ["all-tasks-in-project"] });
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};

export const useEditTasksOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EditTasksOrderType) => EditTasksOrderAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks-by-deadline"] });
      queryClient.invalidateQueries({ queryKey: ["all-tasks-in-project"] });
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};

export const useTasksByDeadline = ({
  ProjectId,
  Start,
  End,
}: GetTasksByDeadlineType) => {
  return useQuery({
    queryKey: ["tasks-by-deadline", ProjectId, Start, End],
    queryFn: () => {
      if (!ProjectId || !Start || !End) return Promise.resolve([]);
      return GetTasksByDeadlineAPI({ ProjectId, Start, End });
    },
  });
};

export const useEditTaskDeadline = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EditTaskDeadlineType) => EditTaskDeadlineAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks-by-deadline"] });
      queryClient.invalidateQueries({ queryKey: ["all-tasks-in-project"] });
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};

export const useEditTasksBoardAndOrderType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EditTasksBoardAndOrderType) =>
      EditTasksBoardAndOrderAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks-by-deadline"] });
      queryClient.invalidateQueries({ queryKey: ["all-tasks-in-project"] });
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};

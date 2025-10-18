import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateProjectAPI,
  GetProjectsAPI,
  DeleteProjectAPI,
  EditProjectAPI,
  GetAllTasksInProjectAPI,
} from "@/services/project";
import {
  AllTasksInProjectType,
  CreateProjectType,
  EditProjectType,
} from "@/types/project";
import { errorToast, successToast, loadingToast } from "@/functions/toast";

export const useProjects = (workspaceId: string | null) => {
  const query = useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: () => {
      if (workspaceId === null) {
        return Promise.resolve([]);
      }
      return GetProjectsAPI({ id: workspaceId });
    },
    staleTime: 1000 * 60 * 20,
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

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectType) => CreateProjectAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      successToast("projectCreated");
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      return DeleteProjectAPI({ id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      successToast("projectDeleted");
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};

export const useEditProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, id }: EditProjectType) => EditProjectAPI({ data, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      successToast("projectUpdated");
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};

export const useAllTasksInProject = (projectId: string | null) => {
  return useQuery<AllTasksInProjectType[] | []>({
    queryKey: ["all-tasks-in-project", projectId],
    queryFn: () => {
      if (projectId === null) {
        return Promise.resolve([]);
      }
      return GetAllTasksInProjectAPI({ id: projectId });
    },
    staleTime: 1000 * 60 * 5,
    select: (tasks) => tasks.sort((a, b) => a.order - b.order),
  });
};

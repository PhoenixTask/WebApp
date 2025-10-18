import { useEffect } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateWorkspaceAPI,
  GetWorkspacesAPI,
  DeleteWorkspaceAPI,
  EditWorkspaceAPI,
} from "@/services/workspace";
import { CreateWorkspaceType, EditWorkspaceType } from "@/types/workspace";
import { errorToast, successToast, loadingToast } from "@/functions/toast";

export const useWorkspaces = () => {
  const query = useQuery({
    queryKey: ["workspaces"],
    queryFn: () => GetWorkspacesAPI(),
    staleTime: 1000 * 60 * 30,
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

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWorkspaceType) => CreateWorkspaceAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      successToast("workspaceCreated");
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => DeleteWorkspaceAPI({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      successToast("workspaceDeleted");
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};

export const useEditWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, id }: EditWorkspaceType) =>
      EditWorkspaceAPI({ data, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      successToast("workspaceUpdated");
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};

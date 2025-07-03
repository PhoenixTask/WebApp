import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateWorkspaceAPI,
  GetWorkspacesAPI,
  DeleteWorkspaceAPI,
  EditWorkspaceAPI,
} from "@/services/workspace";
import { CreateWorkspaceType, EditWorkspaceType } from "@/types/workspace";
import toast from "react-hot-toast";
import errorToast from "@/functions/errorToast";

export const useWorkspaces = () => {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: () => GetWorkspacesAPI(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWorkspaceType) => CreateWorkspaceAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      toast.success("میزکار با موفقیت ایجاد شد.");
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
      toast.success("میزکار با موفقیت حذف شد.");
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
      toast.success("میزکار با موفقیت ویرایش شد.");
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};

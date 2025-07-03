import Axios from "@/functions/axiosInstance";
import {
  WorkspaceType,
  WorkspaceIdType,
  CreateWorkspaceType,
  EditWorkspaceType,
} from "@/types/workspace";

export const GetWorkspacesAPI = async (): Promise<WorkspaceType[]> => {
  const response = await Axios.get("/v1/workspace");
  return response.data;
};

export const CreateWorkspaceAPI = async (data: CreateWorkspaceType) => {
  const response = await Axios.post("/v1/workspace", data);
  return response.data;
};

export const DeleteWorkspaceAPI = async ({ id }: WorkspaceIdType) => {
  const response = await Axios.delete(`/v1/workspace/${id}`);
  return response.data;
};

export const GetOneWorkspaceAPI = async ({ id }: WorkspaceIdType) => {
  const response = await Axios.get(`/v1/workspace/${id}`);
  return response.data;
}

export const EditWorkspaceAPI = async ({ data, id }: EditWorkspaceType) => {
  const response = await Axios.put(`/v1/workspace/${id}`, data);
  return response.data;
};

import Axios from "@/functions/axiosInstance";
import { WorkspaceIdType } from "@/types/workspace";
import {
  ProjectType,
  CreateProjectType,
  ProjectIdType,
  EditProjectType,
  AllTasksInProjectType,
} from "@/types/project";

export const GetProjectAPI = async ({
  id: workspaceId,
}: WorkspaceIdType): Promise<ProjectType[]> => {
  const response = await Axios.get(`/v1/workspace/${workspaceId}/project`);
  return response.data;
};

export const CreateProjectAPI = async (data: CreateProjectType) => {
  const response = await Axios.post("/v1/project", data);
  return response.data;
};

export const DeleteProjectAPI = async ({ id }: ProjectIdType) => {
  const response = await Axios.delete(`/v1/project/${id}`);
  return response.data;
};

export const EditProjectAPI = async ({ data, id }: EditProjectType) => {
  const response = await Axios.put(`/v1/project/${id}`, data);
  return response.data;
};

export const GetOneProjectAPI = async ({ id }: ProjectIdType) => {
  const response = await Axios.get(`/v1/project/${id}`);
  return response.data;
};

export const GetAllTasksInProjectAPI = async ({
  id: projectId,
}: ProjectIdType): Promise<AllTasksInProjectType[]> => {
  const response = await Axios.get(
    `/v1/task/tasks-with-board?projectId=${projectId}`
  );
  return response.data;
};

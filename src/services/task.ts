import Axios from "@/functions/axiosInstance";
import {
  TaskType,
  CreateTaskType,
  TaskIdType,
  EditTaskType,
  BoardAndTasksType,
} from "@/types/task";
import { ProjectIdType } from "@/types/project";
import { BoardIdType } from "@/types/board";

export const GetTaskAPI = async ({
  id: boardId,
}: BoardIdType): Promise<TaskType[]> => {
  const response = await Axios.get(`/v1/board/${boardId}/task`);
  return response.data;
};

export const CreateTaskAPI = async (data: CreateTaskType) => {
  const response = await Axios.post("/v1/task", data);
  return response.data;
};

export const DeleteTaskAPI = async ({ id }: TaskIdType) => {
  const response = await Axios.delete(`/v1/task/${id}`);
  return response.data;
};

export const EditTaskAPI = async ({ data, id }: EditTaskType) => {
  const response = await Axios.put(`/v1/task/${id}`, data);
  return response.data;
};

export const GetOneTaskAPI = async ({ id }: TaskIdType) => {
  const response = await Axios.get(`/v1/task/${id}`);
  return response.data;
};

export const GetBoardsAndTasksAPI = async ({
  id: projectId,
}: ProjectIdType): Promise<BoardAndTasksType[]> => {
  const response = await Axios.get(`/v1/project/${projectId}/get-board-task`);
  return response.data;
};

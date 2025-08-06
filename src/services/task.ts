import Axios from "@/functions/axiosInstance";
import {
  TaskType,
  CreateTaskType,
  TaskIdType,
  EditTaskType,
  EditTasksOrderType,
  EditTaskOrderType,
  EditTaskBoardType,
  GetTasksByDeadlineType,
  EditTaskDeadlineType,
  EditTasksBoardAndOrderType,
} from "@/types/task";
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

export const EditTaskBoardAPI = async (data: EditTaskBoardType) => {
  const response = await Axios.patch("/v1/task/update-board", data);
  return response.data;
};

export const EditTasksOrderAPI = async (data: EditTasksOrderType) => {
  const response = await Axios.patch("/v2/task/update-order", data);
  return response.data;
};

export const EditTasksBoardAndOrderAPI = async (
  data: EditTasksBoardAndOrderType
) => {
  const response = await Axios.patch("/v1/task/update-board-order", data);
  return response.data;
};

export const EditTaskOrderAPI = async (data: EditTaskOrderType) => {
  const response = await Axios.patch("/v1/task/update-order", data);
  return response.data;
};

export const GetOneTaskAPI = async ({ id }: TaskIdType) => {
  const response = await Axios.get(`/v1/task/${id}`);
  return response.data;
};

export const GetTasksByDeadlineAPI = async ({
  ProjectId,
  Start,
  End,
}: GetTasksByDeadlineType) => {
  const response = await Axios.get(`/v1/task/get-by-deadline`, {
    params: { ProjectId, Start, End },
  });
  return response.data;
};

export const EditTaskDeadlineAPI = async (data: EditTaskDeadlineType) => {
  const response = await Axios.patch("/v1/task/update-deadline", data);
  return response.data;
};

import Axios from "@/functions/axiosInstance";
import {
  BoardIdType,
  BoardType,
  BoardsAndTasksType,
  CreateBoardType,
  EditBoardType,
  EditBoardOrdersType,
} from "@/types/board";
import { ProjectIdType } from "@/types/project";

export const GetBoardAPI = async ({
  id: projectId,
}: ProjectIdType): Promise<BoardType[]> => {
  const response = await Axios.get(`/v1/project/${projectId}/board`);
  return response.data;
};

export const GetBoardsAndTasksAPI = async ({
  id: projectId,
}: ProjectIdType): Promise<BoardsAndTasksType> => {
  const response = await Axios.get(`/v1/project/${projectId}/get-board-task`);
  return response.data;
};

export const CreateBoardAPI = async (data: CreateBoardType) => {
  const response = await Axios.post("/v1/board", data);
  return response.data;
};

export const DeleteBoardAPI = async ({ id }: BoardIdType) => {
  const response = await Axios.delete(`/v1/board/${id}`);
  return response.data;
};

export const EditBoardAPI = async ({ data, id }: EditBoardType) => {
  const response = await Axios.put(`/v1/board/${id}`, data);
  return response.data;
};

export const EditBoardOrderAPI = async (data: EditBoardOrdersType) => {
  const response = await Axios.patch("/v2/board/update-order", data);
  return response.data;
};

export const GetOneBoardAPI = async ({
  id,
}: BoardIdType): Promise<BoardType> => {
  const response = await Axios.get(`/v1/board/${id}`);
  return response.data;
};

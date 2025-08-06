import { TaskType, TaskWithBoardIdType } from "./task";

export type BoardType = {
  id: string;
  name: string;
  color: string;
  order: number;
  isArchive?: boolean;
};

export type BoardAndTasksType = BoardType & {
  taskResponses: TaskType[];
};

export type BoardsAndTasksType = {
  data: BoardAndTasksType[];
  page: number;
  total: number;
};

export type BoardAndTasksV2Type = BoardType & {
  tasks: TaskWithBoardIdType[];
};

export type BoardIdType = {
  id: string;
};

export type CreateBoardType = {
  projectId: string;
  name: string;
  color: string;
  order?: number;
};

export type EditBoardType = {
  id: string;
  data: Omit<BoardType, "id">;
};

type BoardOrderType = {
  id: string;
  order: number;
};

export type EditBoardOrdersType = {
  boards: BoardOrderType[];
};

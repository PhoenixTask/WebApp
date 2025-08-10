import { TaskType } from "./task";

export type ProjectType = {
  id: string;
  name: string;
  color: string;
};

export type ProjectIdType = {
  id: string;
};

export type CreateProjectType = {
  name: string;
  workspaceId: string;
};

export type EditProjectType = {
  id: string;
  data: Omit<ProjectType, "id">;
};

export type AllTasksInProjectType = TaskType & {
  boardId: string;
  boardName: string;
};
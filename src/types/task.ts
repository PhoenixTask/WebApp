export type TaskType = {
  id: string;
  name: string;
  deadLine: string;
  priority: number;
  order?: number;
  isComplete?: boolean;
  description?: string;
};

export type TaskIdType = {
  id: string;
};

export type EditTaskType = {
  id: string;
  data: Omit<TaskType, "id"> & { boardId: string };
};

export type CreateTaskType = {
  boardId: string;
  name: string;
  description?: string;
  deadLine: string;
  priority: number;
  order?: number;
};

export type BoardAndTasksType = {
  data: {
    id: string;
    name: string;
    color: string;
    order: number;
    isArchive: boolean;
    taskResponses: TaskType[];
  };
  page: number;
  total: number;
};

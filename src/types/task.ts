export type TaskType = {
  id: string;
  name: string;
  deadLine: string;
  priority: number;
  order: number;
  isComplete?: boolean;
  description?: string;
};

export type TaskWithBoardIdType = TaskType & { boardId: string };

export type TaskIdType = {
  id: string;
};

export type EditTaskDataType = {
  boardId: string;
  name: string;
  description: string;
  deadLine: string;
  priority: number;
};

export type EditTaskType = {
  id: string;
  data: EditTaskDataType;
};

export type CreateTaskType = {
  boardId: string;
  name: string;
  description?: string;
  deadLine: string;
  priority: number;
  order?: number;
};

type TaskOrderType = {
  id: string;
  order: number;
};

export type EditTasksOrderType = {
  tasks: TaskOrderType[];
};

export type EditTaskOrderType = {
  taskId: string;
  order: number;
};

export type EditTaskBoardType = {
  taskId: string;
  boardId: string;
};

export type EditTasksBoardAndOrderType = {
  taskRequests: 
    {
      taskId: string;
      boardId: string;
      order: number;
    }[],
};

export type GetTasksByDeadlineType = {
  ProjectId: string;
  Start: string;
  End: string;
};

export type EditTaskDeadlineType = {
  taskId: string;
  deadLine: string;
};

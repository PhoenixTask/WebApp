export type WorkspaceType = {
  id: string;
  name: string;
  color: string;
};

export type WorkspaceIdType = {
  id: string;
};

export type CreateWorkspaceType = Omit<WorkspaceType, "id">;

export type EditWorkspaceType = {
  id: string;
  data: {
    name: string;
    description: string;
  };
};

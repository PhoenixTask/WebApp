export type BoardType = {
  id: string;
  name: string;
  color: string;
  order?: number;
  isArchive?: boolean;
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

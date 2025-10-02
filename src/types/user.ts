export type LoginType = {
  username: string;
  password: string;
};

export type LoginReturnsType = {
  userId: string;
  token: string;
  refreshToken: string;
};

export type RegisterType = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type RefreshType = {
  userId: string;
};

export type UserInfoType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
};

export type EditUserInfoType = {
  firstName: string;
  lastName: string;
};

export type UploadProfileType = {
  base64File: string;
  fileName: string;
};

import Axios from "@/functions/axiosInstance";
import {
  RegisterType,
  LoginType,
  EditUserInfoType,
  UserInfoType,
  LoginReturnsType,
  RefreshType,
  UploadProfileType,
} from "@/types/user";

export const RegisterAPI = async (data: RegisterType) => {
  const response = await Axios.post("/v1/user", data);
  return response.data;
};

export const LoginAPI = async (data: LoginType): Promise<LoginReturnsType> => {
  const response = await Axios.post("/v2/user/login", data);
  return response.data;
};

export const RefreshAPI = async (data: RefreshType) => {
  const response = await Axios.post("/v1/user/refresh-token", data);
  return response.data;
};

export const GetUserInfoAPI = async (): Promise<UserInfoType> => {
  const response = await Axios.get("/v1/user/info");
  return response.data;
};

export const EditUserInfoAPI = async (data: EditUserInfoType) => {
  const response = await Axios.put("/v1/user", data);
  return response.data;
};

export const UploadProfileAPI = async (data: UploadProfileType) => {
  const response = await Axios.post("/v1/user/upload", data);
  return response.data;
};

export const GetProfileAPI = async (userId: string) => {
  const Response = await Axios.get(`/v1/user/download?userId=${userId}`, {
    responseType: "blob",
  });
  return Response.data;
};

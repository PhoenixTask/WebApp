import { useState } from "react";
import {
  LoginType,
  RegisterType,
  EditUserInfoType,
  UploadProfileType,
} from "@/types/user";
import {
  EditUserInfoAPI,
  GetProfileAPI,
  GetUserInfoAPI,
  LoginAPI,
  RegisterAPI,
  UploadProfileAPI,
} from "@/services/user";
import {
  setAccessToken,
  setRefreshToken,
  setUserId,
} from "@/functions/tokenManager";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import errorToast from "@/functions/errorToast";
import { convertFileToBase64 } from "@/functions/convertFileToBase64";

type AuthCallbacks = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = async (data: LoginType, callbacks?: AuthCallbacks) => {
    setIsLoading(true);

    try {
      const response = await LoginAPI(data);
      setAccessToken(response.token);
      setRefreshToken(response.refreshToken);
      setUserId(response.userId);
      callbacks?.onSuccess?.();
      return response;
    } catch (err) {
      callbacks?.onError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  const registerHandler = async (
    data: RegisterType,
    callbacks?: AuthCallbacks
  ) => {
    setIsLoading(true);

    try {
      const response = await RegisterAPI(data);

      callbacks?.onSuccess?.();
      return response;
    } catch (err) {
      callbacks?.onError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loginHandler,
    registerHandler,
    isLoading,
  };
};

export const useUserInfo = () => {
  return useQuery({
    queryKey: ["user-settings"],
    queryFn: () => GetUserInfoAPI(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const useEditUserInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EditUserInfoType) => EditUserInfoAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-settings"] });
      toast.success("ویرایش با موفقیت انجام شد.");
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};


export const useUploadProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const base64 = await convertFileToBase64(file, false);
      const payload = {
        base64File: base64,
        fileName: file.name,
      };
      return UploadProfileAPI(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      toast.success("تصویر پروفایل با موفقیت آپلود شد.");
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};

export const useGetProfile = (userId: string) => {
  return useQuery({
    queryKey: ["user-profile", userId],
    queryFn: async () => {
      const userProfile = await GetProfileAPI(userId);
      const imageUrl = URL.createObjectURL(userProfile as Blob);

      return imageUrl;
    },
    enabled: !!userId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

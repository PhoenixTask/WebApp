import { useState } from "react";
import { LoginType, RegisterType, EditUserInfoType } from "@/types/user";
import {
  EditUserInfoAPI,
  GetProfileAPI,
  GetUserInfoAPI,
  LoginAPI,
  LogoutAPI,
  RegisterAPI,
  UploadProfileAPI,
} from "@/services/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import errorToast from "@/functions/errorToast";
import successToast from "@/functions/successToast";
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

  const logoutHandler = async () => {
    await LogoutAPI();
  };

  return {
    loginHandler,
    logoutHandler,
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
      successToast("accountUpdated");
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
      successToast("profileImageUploaded");
    },
    onError: (error) => {
      errorToast(error);
    },
  });
};

export const useGetProfile = (userId: string | null) => {
  return useQuery({
    queryKey: ["user-profile", userId],
    queryFn: async () => {
      if (!userId) return null;

      const userProfile = await GetProfileAPI(userId);
      if (userProfile.size === 0) return "/default-profile.svg";

      const imageUrl = URL.createObjectURL(userProfile as Blob);

      return imageUrl;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

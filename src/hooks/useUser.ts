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
import { setUserId } from "@/functions/userIdManager";

type AuthCallbacks = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

export const useAuth = () => {
  const loginHandler = async (data: LoginType, callbacks?: AuthCallbacks) => {
    try {
      const response = await LoginAPI(data);
      callbacks?.onSuccess?.();
      return response;
    } catch (err) {
      callbacks?.onError?.(err);
    }
  };

  const registerHandler = async (
    data: RegisterType,
    callbacks?: AuthCallbacks
  ) => {
    try {
      const response = await RegisterAPI(data);

      callbacks?.onSuccess?.();
      return response;
    } catch (err) {
      callbacks?.onError?.(err);
    }
  };

  const logoutHandler = async () => {
    await LogoutAPI();
  };

  return {
    loginHandler,
    logoutHandler,
    registerHandler,
  };
};

export const useUserInfo = () => {
  return useQuery({
    queryKey: ["user-settings"],
    queryFn: async () => {
      const userInfo = await GetUserInfoAPI();
      setUserId(userInfo.id);
      return userInfo;
    },
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

export const useGetProfile = (userId: string | null | undefined) => {
  return useQuery({
    queryKey: ["user-profile", userId],
    queryFn: async () => {
      const defaultProfile = "/default-profile.svg";

      if (!userId) return defaultProfile;

      const userProfile = await GetProfileAPI(userId);
      if (userProfile.size === 0) return defaultProfile;

      const imageUrl = URL.createObjectURL(userProfile as Blob);

      return imageUrl;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

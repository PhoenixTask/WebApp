"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getUserId, removeUserId } from "@/functions/userIdManager";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "@/app/loading";
import { useAuth } from "@/hooks/useUser";
import successToast from "@/functions/successToast";
import errorToast from "@/functions/errorToast";
import { LoginType, RegisterType } from "@/types/user";
import { useRouter } from "next/navigation";

type ProtectContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  loginFunction: (formData: LoginType, locale: string) => Promise<void>;
  registerFunction: (formData: RegisterType, locale: string) => Promise<void>;
  logout: () => void;
};

const ProtectContext = createContext<ProtectContextType>(
  {} as ProtectContextType
);

export const useProtect = () => {
  const context = useContext(ProtectContext);
  return context;
};

export const ProtectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const queryClient = useQueryClient();

  const { loginHandler, logoutHandler, registerHandler } = useAuth();

  const router = useRouter();

  useEffect(() => {
    checkAuth();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ProtectContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        loginFunction,
        registerFunction,
        logout,
      }}
    >
      {children}
    </ProtectContext.Provider>
  );

  function checkAuth() {
    const userId = getUserId();
    const hasToken = !!userId;

    setIsAuthenticated(hasToken);
    return hasToken;
  }

  async function loginFunction(formData: LoginType, locale: string) {
    await loginHandler(formData, {
      onSuccess: () => {
        successToast("loginSuccess");
        setIsAuthenticated(true);
        router.push(`/${locale}/list`);
      },
      onError: (err) => {
        errorToast(err);
      },
    });
  }

  async function registerFunction(formData: RegisterType, locale: string) {
    await registerHandler(formData, {
      onSuccess: () => {
        successToast("registerSuccess");
        router.push(`/${locale}/login`);
      },
      onError: (err) => {
        errorToast(err);
      },
    });
  }

  async function logout() {
    await logoutHandler();

    removeUserId();
    queryClient.clear();
    queryClient.invalidateQueries();
    setIsAuthenticated(false);
  }
};

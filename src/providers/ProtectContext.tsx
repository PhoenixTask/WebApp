"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getRefreshToken, removeTokens } from "@/functions/tokenManager";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "@/app/loading";

type ProtectContextType = {
  isAuthenticated: boolean;
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

  useEffect(() => {
    checkAuth();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ProtectContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </ProtectContext.Provider>
  );

  function checkAuth() {
    const token = getRefreshToken();
    const hasToken = !!token;

    setIsAuthenticated(hasToken);
    return hasToken;
  }

  function logout() {
    removeTokens();
    queryClient.clear();
    queryClient.invalidateQueries();
    setIsAuthenticated(false);
  }
};

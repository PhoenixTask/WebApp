import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import errorToast from "./errorToast";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  getUserId,
  setRefreshToken,
  removeTokens,
} from "./tokenManager";
import { RefreshAPI } from "@/services/user";

export const BASE_URL = process.env.NEXT_PUBLIC_END_POINT;

const Axios = axios.create({
  baseURL: BASE_URL,
});

// Request Interceptor
Axios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    errorToast(error);
    return Promise.reject(error);
  }
);

// Refresh Queue Logic
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

function redirectToLogin() {
  if (typeof window === "undefined") return;
  const locale = window.location.pathname.split("/")[1] || "en";
  window.location.replace(`/${locale}/login`);
}

// Response Interceptor
Axios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers["Authorization"] = "Bearer " + token;
            }
            return Axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();
      const userId = getUserId();

      if (!refreshToken || !userId) {
        removeTokens();
        processQueue(error, null);
        redirectToLogin();
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        const { token: newAccessToken, refreshToken: newRefreshToken } =
          await RefreshAPI({ userId, refreshToken });

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        if (Axios.defaults.headers.common) {
          Axios.defaults.headers.common["Authorization"] =
            "Bearer " + newAccessToken;
        }
        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
        }

        processQueue(null, newAccessToken);

        return Axios(originalRequest);
      } catch (refreshError) {
        removeTokens();
        processQueue(refreshError as AxiosError, null);
        redirectToLogin();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.status !== 401) {
      errorToast(error);
    }

    return Promise.reject(error);
  }
);

export default Axios;

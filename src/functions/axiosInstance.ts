import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import errorToast from "./errorToast";
import { getLocale } from "./languageHandler";
import { getUserId, removeUserId } from "./userIdManager";
import { RefreshAPI } from "@/services/user";

export const BASE_URL = process.env.NEXT_PUBLIC_END_POINT;

const Axios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Refresh Queue Logic
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
};

function redirectToLogin() {
  const locale = getLocale();
  window.location.replace(`/${locale}/login`);
}

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
        }).then(() => Axios(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const userId = getUserId();

      if (!userId) {
        processQueue(error);
        redirectToLogin();
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        await RefreshAPI({ userId });
        processQueue(null);
        return Axios(originalRequest);
      } catch (refreshError) {
        removeUserId();
        processQueue(refreshError as AxiosError);
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

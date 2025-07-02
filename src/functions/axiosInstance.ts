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

Axios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    errorToast(error);
    return Promise.reject(error);
  }
);

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
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

Axios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    console.log(error);

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
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();
      const userId = getUserId();

      if (refreshToken && userId) {
        try {
          const { token: newAccessToken, refreshToken: newRefreshToken } =
            await RefreshAPI({
              userId,
              refreshToken,
            });

          setAccessToken(newAccessToken);
          setRefreshToken(newRefreshToken);

          if (Axios.defaults.headers.common) {
            Axios.defaults.headers.common["Authorization"] =
              "Bearer " + newAccessToken;
          }
          if (originalRequest.headers) {
            originalRequest.headers["Authorization"] =
              "Bearer " + newAccessToken;
          }
          processQueue(null, newAccessToken);
          return Axios(originalRequest);
        } catch (refreshError) {
          removeTokens();
          processQueue(refreshError as AxiosError, null);

          window.location.href = "/login";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        removeTokens();
        isRefreshing = false;
        processQueue(error, null);
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    if (error.response?.status !== 401) {
      errorToast(error);
    }
    return Promise.reject(error);
  }
);

export default Axios;

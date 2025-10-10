import { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { tokenStorage } from "./storage";
import { handleApiError } from "./error-handler";

// Request interceptor
export const setupRequestInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      // Add auth token to headers
      const token = await tokenStorage.getToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Log request in development
      if (__DEV__) {
        console.log("📤 API Request:", {
          method: config.method?.toUpperCase(),
          url: config.url,
          data: config.data,
        });
      }

      return config;
    },
    (error: AxiosError) => {
      if (__DEV__) {
        console.error("❌ Request Error:", error);
      }
      return Promise.reject(handleApiError(error));
    }
  );
};

// Response interceptor
export const setupResponseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log response in development
      if (__DEV__) {
        console.log("📥 API Response:", {
          status: response.status,
          url: response.config.url,
          data: response.data,
        });
      }

      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      // Handle 401 - Unauthorized
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Try to refresh token
          const refreshToken = await tokenStorage.getRefreshToken();
          if (refreshToken) {
            // TODO: Implement token refresh logic
            // const newToken = await refreshAuthToken(refreshToken);
            // await tokenStorage.setToken(newToken);
            // originalRequest.headers.Authorization = `Bearer ${newToken}`;
            // return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          // Refresh failed, clear storage and redirect to login
          await tokenStorage.removeToken();
          await tokenStorage.removeRefreshToken();
          // TODO: Navigate to login screen
        }
      }

      if (__DEV__) {
        console.error("❌ API Error:", {
          status: error.response?.status,
          url: error.config?.url,
          message: error.message,
          data: error.response?.data,
        });
      }

      return Promise.reject(handleApiError(error));
    }
  );
};


/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "./api";

type HttpMethod = "get" | "post" | "put" | "delete";

interface RequestOptions {
  params?: Record<string, any>;
  data?: Record<string, any>;
}

const errorHandler = async <T>(
  method: HttpMethod,
  url: string,
  options: RequestOptions = {}
): Promise<T> => {
  try {
    const response = await axiosInstance({ method, url, ...options });
    return response.data as T;
  } catch (error: any) {
    throw error.response?.data || { message: error.message };
  }
};

// General API service
const ApiService = {
  get: <T>(url: string, params: Record<string, any> = {}): Promise<T> =>
    errorHandler<T>("get", url, { params }),
  post: <T>(url: string, data: Record<string, any>): Promise<T> =>
    errorHandler<T>("post", url, { data }),
  put: <T>(url: string, data: Record<string, any>): Promise<T> =>
    errorHandler<T>("put", url, { data }),
  delete: <T>(url: string): Promise<T> => errorHandler<T>("delete", url),
};

export default ApiService;

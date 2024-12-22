/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axiosInstance from "../services/api";

interface PostParams<T> {
  url: string;
  payload: T;
}

interface PostResponse<T> {
  response: T | null;
  loading: boolean;
  error: unknown | null;
  postData: ({
    url,
    payload,
  }: PostParams<any>) => Promise<{ data: T | null; error: unknown | null }>;
}

const usePOST = <T = any, R = any>(): PostResponse<R> => {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);

  const postData = async ({
    url,
    payload,
  }: PostParams<T>): Promise<{ data: R | null; error: unknown | null }> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post<R>(url, payload);
      setData(response.data);
      return { data: response.data, error: null };
    } catch (err: unknown) {
      const errorData = (err as any)?.response?.data || {
        message: (err as Error).message,
      };
      setError(errorData);
      return { data: null, error: errorData };
    } finally {
      setLoading(false);
    }
  };

  return { response: data, loading, error, postData };
};

export default usePOST;

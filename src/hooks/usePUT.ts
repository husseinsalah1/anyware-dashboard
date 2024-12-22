/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axiosInstance from "../services/api";

interface PutParams<T> {
  url: string;
  payload: T;
}

interface PutResponse<T> {
  response: T | null;
  loading: boolean;
  error: unknown | null;
  putData: ({
    url,
    payload,
  }: PutParams<any>) => Promise<{ data: T | null; error: unknown | null }>;
}

const usePUT = <T = any, R = any>(): PutResponse<R> => {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);

  const putData = async ({
    url,
    payload,
  }: PutParams<T>): Promise<{ data: R | null; error: unknown | null }> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.put<R>(url, payload);
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

  return { response: data, loading, error, putData };
};

export default usePUT;

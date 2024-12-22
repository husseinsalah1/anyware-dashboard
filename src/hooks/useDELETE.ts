/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axiosInstance from "../services/api";

interface DeleteParams {
  url: string;
}

interface DeleteResponse<T> {
  data: T | null;
  loading: boolean;
  error: unknown | null;
}

const useDELETE = <T = any>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);

  const deleteData = async ({
    url,
  }: DeleteParams): Promise<DeleteResponse<T>> => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await axiosInstance.delete<T>(url);
      setData(response.data);
      return { data: response.data, loading: false, error: null };
    } catch (err: unknown) {
      const errorData = (err as any)?.response?.data || {
        message: (err as Error).message,
      };
      setError(errorData);
      return { data: null, loading: false, error: errorData };
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, data, loading, error }; // Expose state variables if needed
};

export default useDELETE;

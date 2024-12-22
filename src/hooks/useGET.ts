/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axiosInstance from "../services/api";

interface PaginationState {
  page: number;
  limit: number;
  pageNo: number; // Total pages based on the data count
}

interface FetchParams {
  url: string;
  params?: Record<string, any>; // Optional query parameters
}

interface UseGETResponse<T> {
  response: T | null;
  loading: boolean;
  error: unknown | null;
  count: number;
  fetchData: ({ url, params }: FetchParams) => Promise<void>;
  pagination: PaginationState;
}

const useGET = <T = any>(): UseGETResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);
  const [count, setCount] = useState<number>(0);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10,
    pageNo: 1,
  });

  const fetchData = async ({ url, params }: FetchParams): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const result = await axiosInstance.get<{ data: T; count: number }>(url, {
        params,
      });

      // Assuming API returns data in `{ data, count }` format
      setData(result.data.data);
      setCount(result.data.count);

      const totalPages = Math.ceil(result.data.count / pagination.limit);
      setPagination((prev) => ({
        ...prev,
        pageNo: totalPages,
      }));
    } catch (err: unknown) {
      const errorData = (err as any)?.response?.data || {
        message: (err as Error).message,
      };
      setError(errorData);
    } finally {
      setLoading(false);
    }
  };

  return { response: data, loading, error, fetchData, count, pagination };
};

export default useGET;

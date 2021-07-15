/* eslint-disable @typescript-eslint/ban-types */
import { useState } from "react";
import axios, { AxiosError } from "axios";

// type Status = "idle" | "loading" | "succeed" | "failed" | "cached" | "cancelled";

interface APIResponse<T> {
  data: T | null;
  error: AxiosError | null;
}

interface APIFucntions<U> {
  makeRequest: (body: U) => Promise<void>;
}

interface UsePostReturnType<T, U> extends APIResponse<T>, APIFucntions<U> {
  // status: Status;
}

const usePost = <T, U>(url: string): UsePostReturnType<T, U> => {
  const [state, setState] = useState<APIResponse<T>>({ data: null, error: null });

  const makeRequest = async (body: U) => {
    try {
      // TODO: intercept 하여 status 변경
      const { data } = await axios.post<T>(url, body);

      setState((prev) => ({ ...prev, data, error: null }));
    } catch (err) {
      const error = err as AxiosError;

      setState((prev) => ({ ...prev, error, data: null }));
    }
  };

  return { ...state, makeRequest };
};

export default usePost;

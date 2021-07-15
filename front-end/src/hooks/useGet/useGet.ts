import { useCallback, useState } from "react";
import axios, { AxiosError } from "axios";

// type Status = "idle" | "loading" | "succeed" | "failed" | "cached" | "cancelled";

interface APIResponse<T> {
  data: T | null;
  error: AxiosError | null;
}

interface APIFucntions {
  makeRequest: () => Promise<void>;
}

interface UseGetReturnType<T> extends APIResponse<T>, APIFucntions {
  // status: Status;
}

const useGet = <T>(url: string): UseGetReturnType<T> => {
  const [state, setState] = useState<APIResponse<T>>({ data: null, error: null });

  const makeRequest = useCallback(async () => {
    try {
      // TODO: intercept 하여 status 변경
      const { data } = await axios.get<T>(url);

      setState((prev) => ({ ...prev, data, error: null }));
    } catch (err) {
      const error = err as AxiosError;

      setState((prev) => ({ ...prev, error, data: null }));
    }
  }, [url]);

  return { ...state, makeRequest };
};

export default useGet;

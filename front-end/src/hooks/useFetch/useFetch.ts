import { useCallback, useState } from "react";
import { AxiosError } from "axios";
import { getData } from "../../utils/axios";
import {
  APICallState,
  APIResponse,
  UseFetchOptionParameter,
  UseFetchReturnType,
} from "../../types";

export const unwrapResult = <T>({ data, error }: APIResponse<T>) =>
  error ? Promise.reject(error) : Promise.resolve(data as T);

const useFetch = <T = never, U = void>(
  url: string,
  option?: UseFetchOptionParameter
): UseFetchReturnType<T, U> => {
  const [state, setState] = useState<APICallState<T>>({
    data: null,
    error: null,
    status: "idle",
  });

  const { method = "get", key, relatedKey } = option ?? {};

  const makeRequest = useCallback(
    async (body: U) => {
      try {
        setState((prev) => ({ ...prev, status: "loading" }));

        const data = await getData<T, U>(url, { body, method, key, relatedKey });

        setState((prev) => ({ ...prev, status: "succeed", data, error: null }));

        return { data, error: null };
      } catch (err) {
        const error = err as AxiosError;

        setState((prev) => ({ ...prev, status: "failed", error, data: null }));

        return { data: null, error };
      }
    },
    [key, method, relatedKey, url]
  );

  const done = useCallback(() => setState((prev) => ({ ...prev, status: "idle" })), []);

  return {
    ...state,
    makeRequest,
    done,
    isSucceed: state.status === "succeed",
    isLoading: state.status === "loading",
    isFailed: state.status === "failed",
    isIdle: state.status === "idle",
  };
};

export default useFetch;

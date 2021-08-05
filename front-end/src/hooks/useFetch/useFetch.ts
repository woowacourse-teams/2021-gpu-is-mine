import { useCallback, useRef, useState } from "react";
import { AxiosError } from "axios";
import { getData } from "../../utils/axios";
import {
  APICallState,
  APICallStatus,
  APIResponse,
  UseFetchOptionParameter,
  UseFetchReturnType,
} from "../../types";

export const unwrapResult = <T>({ data, error }: APIResponse<T>) =>
  error ? Promise.reject(error) : Promise.resolve(data as T);

export const generateStatusBoolean = (status: APICallStatus) => ({
  isSucceed: status === "succeed",
  isLoading: status === "loading",
  isFailed: status === "failed",
  isIdle: status === "idle",
});

const useFetch = <T = never, U = void>(
  url: string,
  option?: UseFetchOptionParameter
): UseFetchReturnType<T, U> => {
  const [state, setState] = useState<APICallState<T>>({
    data: null,
    error: null,
    status: "idle",
  });

  const { method = "get", relatedKey = [] } = option ?? {};

  const rKey = useRef(relatedKey);

  const makeRequest = useCallback(
    async (body: U) => {
      try {
        setState((prev) => ({ ...prev, status: "loading" }));

        const data = await getData<T, U>(url, {
          body,
          method,
          relatedKey: rKey.current,
        });

        setState((prev) => ({ ...prev, status: "succeed", data, error: null }));

        return { data, error: null };
      } catch (err) {
        const error = err as AxiosError;

        setState((prev) => ({ ...prev, status: "failed", error, data: null }));

        return { data: null, error };
      }
    },
    [method, url]
  );

  const done = useCallback(() => setState((prev) => ({ ...prev, status: "idle" })), []);

  return {
    ...state,
    makeRequest,
    done,
    ...generateStatusBoolean(state.status),
  };
};

export default useFetch;

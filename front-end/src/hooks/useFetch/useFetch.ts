import { useCallback, useState } from "react";
import axios, { AxiosError } from "axios";
import { APICallState, UseFetchOptionParameter, UseFetchReturnType } from "../../types";

const getClient = (method: UseFetchOptionParameter["method"]) => axios[method].bind(axios);

const useFetch = <T, U = void>(
  url: string,
  option?: UseFetchOptionParameter
): UseFetchReturnType<T, U> => {
  const [state, setState] = useState<APICallState<T>>({
    data: null,
    error: null,
    status: "idle",
  });

  const { method = "get" } = option ?? {};

  const makeRequest = useCallback(
    async (body: U) => {
      try {
        setState((prev) => ({ ...prev, status: "loading" }));
        const client = getClient(method);

        const { data } = await client<T>(url, body);

        setState((prev) => ({ ...prev, status: "succeed", data, error: null }));

        return data;
      } catch (err) {
        const error = err as AxiosError;

        setState((prev) => ({ ...prev, status: "failed", error, data: null }));

        return Promise.reject(error);
      }
    },
    [method, url]
  );

  const done = useCallback(() => setState((prev) => ({ ...prev, status: "idle" })), []);

  return { ...state, makeRequest, done };
};

export default useFetch;

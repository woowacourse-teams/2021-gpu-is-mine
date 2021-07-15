import { useCallback, useState } from "react";
import axios, { AxiosError } from "axios";
import { APICallState, UseFetchOptionParameter, UseFetchReturnType } from "../../types/api";

const getClient = ({ method }: UseFetchOptionParameter) => {
  switch (method) {
    case "post":
      return axios.post.bind(axios);
    case "get":
    default:
      return axios.get.bind(axios);
  }
};

const useFetch = <T, U = void>(
  url: string,
  option?: UseFetchOptionParameter
): UseFetchReturnType<T, U> => {
  const [state, setState] = useState<APICallState<T>>({
    data: null,
    error: null,
    status: "idle",
  });

  const makeRequest = useCallback(
    async (body: U) => {
      try {
        setState((prev) => ({ ...prev, status: "loading" }));

        const client = getClient(option ?? { method: "get" });

        const { data } = await client<T>(url, body);

        setState((prev) => ({ ...prev, status: "succeed", data, error: null }));

        return data;
      } catch (err) {
        const error = err as AxiosError;

        setState((prev) => ({ ...prev, status: "failed", error, data: null }));

        return Promise.reject(error);
      }
    },
    [option, url]
  );

  const done = useCallback(() => setState((prev) => ({ ...prev, status: "idle" })), []);

  return { ...state, makeRequest, done };
};

export default useFetch;

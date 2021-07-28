import { useCallback, useState } from "react";
import { AxiosError } from "axios";
import { getData } from "../../utils/axios";
import {
  APICallState,
  MakeRequestReturnType,
  UseFetchOptionParameter,
  UseFetchReturnType,
} from "../../types";

export const unwrapResult = <T>(ret: MakeRequestReturnType<T>) => ret.unwrap.call(ret);

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
      const unwrap = function unwrap(this: MakeRequestReturnType<T>) {
        return this.error ? Promise.reject(this.error) : Promise.resolve(this.data as T);
      };

      try {
        setState((prev) => ({ ...prev, status: "loading" }));

        const data = await getData<T, U>(url, { body, method });

        setState((prev) => ({ ...prev, status: "succeed", data, error: null }));

        return { data, error: null, unwrap };
      } catch (err) {
        const error = err as AxiosError;

        setState((prev) => ({ ...prev, status: "failed", error, data: null }));

        return { data: null, error, unwrap };
      }
    },
    [method, url]
  );

  const done = useCallback(() => setState((prev) => ({ ...prev, status: "idle" })), []);

  return { ...state, makeRequest, done };
};

export default useFetch;

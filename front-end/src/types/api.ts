import { AxiosError } from "axios";

export type APICallStatus = "idle" | "loading" | "succeed" | "failed";

export interface APIResponse<T> {
  data: T | null;
  error: AxiosError | null;
}

export type MakeRequestReturnType<T> = APIResponse<T>;

export interface APIFunctions<T, U = void> {
  makeRequest: (body: U) => Promise<MakeRequestReturnType<T>>;
  done: () => void;
}

export interface APICallState<T> extends APIResponse<T> {
  status: APICallStatus;
}

interface APICallStatusBoolean {
  isIdle: boolean;
  isLoading: boolean;
  isSucceed: boolean;
  isFailed: boolean;
}

export type RequestConfig<U> = {
  method: "get" | "post" | "head" | "delete" | "options" | "post" | "put" | "patch";
  body?: U;
};

export type UseFetchOptionParameter = Omit<RequestConfig<never>, "body">;

export type UseFetchReturnType<T, U> = APICallState<T> & APIFunctions<T, U> & APICallStatusBoolean;

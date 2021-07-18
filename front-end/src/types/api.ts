import { AxiosError } from "axios";

export type APICallStatus = "idle" | "loading" | "succeed" | "failed" | "cached" | "cancelled";

export interface APIResponse<T> {
  data: T | null;
  error: AxiosError | null;
}

export interface MakeRequestReturnType<T> extends APIResponse<T> {
  unwrap: () => Promise<T | AxiosError<any>>;
}

export interface APIFunctions<T, U = void> {
  makeRequest: (body: U) => Promise<MakeRequestReturnType<T>>;
  done: () => void;
}

export interface APICallState<T> extends APIResponse<T> {
  status: APICallStatus;
}

export interface UseFetchOptionParameter {
  method: "get" | "post" | "head" | "delete" | "options" | "post" | "put" | "patch";
}

export type UseFetchReturnType<T, U> = APICallState<T> & APIFunctions<T, U>;

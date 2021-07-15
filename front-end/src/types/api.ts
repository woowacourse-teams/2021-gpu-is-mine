import { AxiosError } from "axios";

export type APICallStatus = "idle" | "loading" | "succeed" | "failed" | "cached" | "cancelled";

export interface APIResponse<T> {
  data: T | null;
  error: AxiosError | null;
}

export interface APIFucntions<T, U = void> {
  makeRequest: (body: U) => Promise<T | AxiosError<any>>;
  done: () => void;
}

export interface APICallState<T> extends APIResponse<T> {
  status: APICallStatus;
}

export interface UseFetchOptionParameter {
  method: "get" | "post" | "head" | "delete" | "options" | "post" | "put" | "patch";
}

export type UseFetchReturnType<T, U> = APICallState<T> & APIFucntions<T, U>;

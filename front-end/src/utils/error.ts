import { miniSerializeError } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import type { RequiredSerializedError } from "../features/job/jobSlice";

type ErrorName =
  | "AuthorizationError"
  | "NetworkError"
  | "BadRequestError"
  | "InternalError"
  | "UnknownError";

export interface CustomError extends Error {
  name: ErrorName;
}

export const ERROR_NAME: Record<ErrorName, string> = {
  InternalError: "알 수 없는 에러",
  NetworkError: "Network 연결 에러",
  UnknownError: "알 수 없는 에러",
  AuthorizationError: "인증 에러",
  BadRequestError: "잘못된 요청",
} as const;

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> =>
  (<AxiosError>error)?.isAxiosError;

export const throwError = (name: ErrorName, message: string) => {
  const error = new Error(message);
  error.name = name;

  throw error as CustomError;
};

export const defaultError = (error: CustomError) =>
  ({
    ...miniSerializeError(error),
    name: ERROR_NAME[error.name] ?? "알 수 없는 에러 발생",
  } as RequiredSerializedError);

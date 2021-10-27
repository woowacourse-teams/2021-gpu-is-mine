import type { AxiosError } from "axios";
import type { SerializedError } from "@reduxjs/toolkit";

type ErrorName = "NetworkError" | "BadRequestError" | "InternalError" | "UnknownError";

export interface CustomError extends SerializedError {
  name: ErrorName;
  message: string;
}

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> =>
  (<AxiosError>error)?.isAxiosError;

export const throwError = (name: ErrorName, message: string) => {
  const error = new Error(message);
  error.name = name;

  throw error;
};

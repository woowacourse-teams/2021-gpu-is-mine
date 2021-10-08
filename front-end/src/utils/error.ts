/* eslint-disable import/prefer-default-export */

type ErrorName = "AuthorizationError";

export const throwError = (name: ErrorName, message: string) => {
  const error = new Error(message);
  error.name = name;

  throw error;
};

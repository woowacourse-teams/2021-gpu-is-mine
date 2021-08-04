import { membersMeResponse } from "./memberResponses";

// eslint-disable-next-line import/prefer-default-export
export const authContextValue = {
  myInfo: membersMeResponse,
  isAuthenticated: false,
  isLoading: false,
  isFailed: false,
  isSucceed: true,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  signup: () => Promise.resolve(),
  done: () => {},
};

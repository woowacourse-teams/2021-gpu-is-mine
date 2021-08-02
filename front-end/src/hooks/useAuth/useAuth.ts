import { createContext, useCallback, useContext, useEffect } from "react";
import useBoolean from "../useBoolean/useBoolean";
import { usePostLogin, useGetMyInfo, usePostSignup } from "../useApi/useApi";
import { MemberLoginRequest, MyInfoResponse, MemberSignupRequest } from "../../types";
import { unwrapResult } from "../useFetch/useFetch";

interface AuthContext {
  isAuthenticated: boolean;
  signup: ({ email, password, name, memberType }: MemberSignupRequest) => Promise<void>;
  login: ({ email, password }: MemberLoginRequest) => Promise<void>;
  logout: (arg: never) => Promise<unknown>;
  done: () => void;
  isLoading: boolean;
  isError: boolean;
  myInfo: MyInfoResponse | null;
}

export const authContext = createContext<AuthContext | null>(null);

export const useAuth = () => {
  const cxt = useContext(authContext);

  if (!cxt) {
    throw new Error("AuthProvider 안에서 호출해주세요 ");
  }

  return cxt;
};

export const useRequest = () => {
  const { makeRequest: requestLogin, status: loginStatus, done: loginDone } = usePostLogin();

  const {
    makeRequest: fetchMyInfo,
    status: myInfoStatus,
    data: myInfo,
    done: myInfoDone,
  } = useGetMyInfo();

  const { makeRequest: requestSignup, status: sigupStatus, done: signupDone } = usePostSignup();

  const isLoading = [loginStatus, myInfoStatus, sigupStatus].some((status) => status === "loading");

  const isError = [loginStatus, myInfoStatus, sigupStatus].some((status) => status === "failed");

  const done = () => {
    loginDone();
    myInfoDone();
    signupDone();
  };

  return { requestLogin, requestSignup, fetchMyInfo, myInfo, isLoading, isError, done };
};

export const useAuthProvider = () => {
  const [isAuthenticated, authenticate, unauthenticate] = useBoolean(false);

  const { isLoading, isError, requestLogin, requestSignup, fetchMyInfo, myInfo, done } =
    useRequest();

  const signup = useCallback(
    async ({ email, labId, password, name, memberType }: MemberSignupRequest) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      requestSignup({ email, labId, password, name, memberType });
    },
    [requestSignup]
  );

  const login = useCallback(
    async ({ email, password }: MemberLoginRequest) => {
      const { data } = await requestLogin({ email, password });
      if (!data) {
        return;
      }
      const { accessToken } = data;

      sessionStorage.setItem("accessToken", accessToken);

      authenticate();

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchMyInfo();
    },
    [authenticate, fetchMyInfo, requestLogin]
  );

  const logout = useCallback(async () => {
    unauthenticate();

    sessionStorage.removeItem("accessToken");
  }, [unauthenticate]);

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      fetchMyInfo().then(unwrapResult).then(authenticate).catch(logout);
    }
  }, [authenticate, fetchMyInfo, logout]);

  return { isAuthenticated, isLoading, isError, signup, login, logout, myInfo, done };
};

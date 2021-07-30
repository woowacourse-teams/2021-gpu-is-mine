import { createContext, useCallback, useContext, useEffect } from "react";
import useBoolean from "../useBoolean/useBoolean";
import useFetch from "../useFetch/useFetch";
import { API_ENDPOINT } from "../../constants";
import {
  MemberLoginResponse,
  MemberLoginRequest,
  MyInfoResponse,
  MemberSignupRequest,
} from "../../types";

interface AuthContext {
  isAuthenticated: boolean;
  signup: ({ email, password, name, memberType }: MemberSignupRequest) => Promise<void>;
  login: ({ email, password }: MemberLoginRequest) => Promise<void>;
  logout: (arg: never) => Promise<unknown>;
  isLoading: boolean;
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

const useGetMyInfo = () =>
  useFetch<MyInfoResponse>(API_ENDPOINT.ME, {
    method: "get",
  });

const usePostLogin = () =>
  useFetch<MemberLoginResponse, MemberLoginRequest>(API_ENDPOINT.LOGIN, {
    method: "post",
  });

const usePostSignup = () =>
  useFetch<void, MemberSignupRequest>(API_ENDPOINT.MEMBERS, {
    method: "post",
  });

export const useRequest = () => {
  const { makeRequest: requestLogin, status: loginStatus } = usePostLogin();

  const { makeRequest: fetchMyInfo, status: myInfoStatus, data: myInfo } = useGetMyInfo();

  const { makeRequest: requestSignup, status: sigupStatus } = usePostSignup();

  const isLoading = [loginStatus, myInfoStatus, sigupStatus].some((status) => status === "loading");

  return { requestLogin, requestSignup, fetchMyInfo, myInfo, isLoading };
};

export const useAuthProvider = () => {
  const [isAuthenticated, authenticate, unauthenticate] = useBoolean(false);

  const { isLoading, requestLogin, requestSignup, fetchMyInfo, myInfo } = useRequest();

  const signup = useCallback(
    async ({ email, labId, password, name, memberType }: MemberSignupRequest) =>
      (await requestSignup({ email, labId, password, name, memberType })).unwrap(),
    [requestSignup]
  );

  const login = useCallback(
    async ({ email, password }: MemberLoginRequest) => {
      const { accessToken } = await (await requestLogin({ email, password })).unwrap();

      sessionStorage.setItem("accessToken", accessToken);

      authenticate();
    },
    [authenticate, requestLogin]
  );

  const logout = useCallback(async () => {
    unauthenticate();

    sessionStorage.removeItem("accessToken");
  }, [unauthenticate]);

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      fetchMyInfo().then(authenticate).catch(logout);
    }
  }, [authenticate, fetchMyInfo, logout]);

  return { isAuthenticated, isLoading, signup, login, logout, myInfo };
};
import { createContext, useCallback, useContext, useEffect } from "react";
import useBoolean from "../useBoolean/useBoolean";
import useFetch from "../useFetch/useFetch";
import { API_ENDPOINT } from "../../constants";
import { MemberLoginResponse, MemberLoginRequest, MyInfoResponse } from "../../types";

interface AuthContext {
  isAuthenticated: boolean;
  login: ({ email, password }: { email: string; password: string }) => Promise<unknown>;
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

export const useRequest = () => {
  const { makeRequest: requestLogin, status: loginStatus } = usePostLogin();

  const { makeRequest: fetchMyInfo, status: myInfoStatus, data: myInfo } = useGetMyInfo();

  const isLoading = [loginStatus, myInfoStatus].some((status) => status === "loading");

  return { requestLogin, fetchMyInfo, myInfo, isLoading };
};

export const useAuthProvider = () => {
  const [isAuthenticated, authenticate, unauthenticate] = useBoolean(false);

  const { requestLogin, fetchMyInfo, myInfo, isLoading } = useRequest();

  const login = async ({ email, password }: { email: string; password: string }) => {
    const { accessToken } = await (await requestLogin({ email, password })).unwrap();

    sessionStorage.setItem("accessToken", accessToken);

    authenticate();
  };

  const logout = useCallback(async () => {
    unauthenticate();

    sessionStorage.removeItem("accessToken");
  }, [unauthenticate]);

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      fetchMyInfo().then(authenticate).catch(logout);
    }
  }, [authenticate, fetchMyInfo, logout]);

  return { isAuthenticated, login, logout, isLoading, myInfo };
};

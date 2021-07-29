import { createContext, useContext } from "react";
import useBoolean from "../useBoolean/useBoolean";
import useFetch from "../useFetch/useFetch";
import { API_ENDPOINT } from "../../constants";
import { MemberLoginResponse, MemberLoginRequest } from "../../types";

interface AuthContext {
  isAuthenticated: boolean;
  login: ({ email, password }: { email: string; password: string }) => Promise<unknown | Error>;
  logout: (arg: never) => Promise<unknown | Error>;
}

export const authContext = createContext<AuthContext | null>(null);

export const useAuth = () => {
  const cxt = useContext(authContext);

  if (!cxt) {
    throw new Error("AuthProvider 안에서 호출해주세요 ");
  }

  return cxt;
};

export const useAuthProvider = () => {
  const [isAuthenticated, authenticate, unauthenticate] = useBoolean(false);

  const { makeRequest: loginRequest } = useFetch<MemberLoginResponse, MemberLoginRequest>(
    API_ENDPOINT.LOGIN,
    {
      method: "post",
    }
  );

  const login = async ({ email, password }: { email: string; password: string }) => {
    const { accessToken } = await (await loginRequest({ email, password })).unwrap();

    authenticate();

    sessionStorage.setItem("accessToken", accessToken);
  };

  const logout = async () => {
    // useFetch logout

    unauthenticate();

    sessionStorage.removeItem("accessToken");
  };

  return { isAuthenticated, login, logout };
};

import { createContext, useContext } from "react";
import { MemberLoginRequest, MyInfoResponse, MemberSignupRequest } from "../../types";

interface AuthContext {
  isAuthenticated: boolean;
  signup: ({ email, password, name, memberType }: MemberSignupRequest) => Promise<void>;
  login: ({ email, password }: MemberLoginRequest) => Promise<void>;
  logout: (arg: never) => Promise<unknown>;
  done: () => void;
  isLoading: boolean;
  isFailed: boolean;
  isSucceed: boolean;
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

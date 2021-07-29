import { createContext, useContext /* ,useState */ } from "react";

import { useBoolean } from "../../hooks";

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
  // const [member, setMember] = useState();

  // console.log(member, setMember);

  const login = async ({ email, password }: { email: string; password: string }) => {
    // useFetch login
    console.log(email, password);

    authenticate();

    // sessionStorage.setItem
  };

  const logout = async () => {
    // useFetch logout

    unauthenticate();
  };

  return { isAuthenticated, login, logout };
};

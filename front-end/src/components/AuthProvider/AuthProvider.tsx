import { ReactNode } from "react";
import { authContext } from "../../hooks/useAuth/useAuth";
import useAuthProvider from "../../hooks/useAuth/useAuthProvider";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuthProvider();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export default AuthProvider;

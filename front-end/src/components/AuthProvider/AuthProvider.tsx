import { ReactNode } from "react";
import { authContext, useAuthProvider } from "./hooks";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuthProvider();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export default AuthProvider;

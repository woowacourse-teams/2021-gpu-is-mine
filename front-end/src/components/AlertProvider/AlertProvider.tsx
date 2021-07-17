import { createContext, useContext } from "react";
import { useBoolean } from "../../hooks";
import { DialogContextProps, DialogProviderProps } from "../../types";

const AlertContext = createContext<DialogContextProps | null>(null);

export const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useContext must be inside a Provider");
  }

  return context;
};

const AlertProvider = ({ defaultIsOpen = false, children }: DialogProviderProps) => {
  const [isOpen, open, close] = useBoolean(defaultIsOpen);

  return <AlertContext.Provider value={{ isOpen, open, close }}>{children}</AlertContext.Provider>;
};

export default AlertProvider;

import { createContext, useContext } from "react";
import { useBoolean } from "../../hooks";
import { DialogContextProps, DialogProviderProps } from "../../types/dialog";

const ConfirmContext = createContext<DialogContextProps | null>(null);

export const useConfirm = () => {
  const context = useContext(ConfirmContext);

  if (!context) {
    throw new Error("useContext must be inside a Provider");
  }

  return context;
};

const ConfirmProvider = ({ defaultIsOpen = false, children }: DialogProviderProps) => {
  const [isOpen, open, close] = useBoolean(defaultIsOpen);

  return (
    <ConfirmContext.Provider value={{ isOpen, open, close }}>{children}</ConfirmContext.Provider>
  );
};

export default ConfirmProvider;

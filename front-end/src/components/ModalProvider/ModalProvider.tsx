import { createContext, useContext } from "react";
import { useBoolean } from "../../hooks";
import { DialogContextProps, DialogProviderProps } from "../../types";

const ModalContext = createContext<DialogContextProps | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useContext must be inside a Provider");
  }

  return context;
};

const ModalProvider = ({ defaultIsOpen = false, children }: DialogProviderProps) => {
  const [isOpen, open, close] = useBoolean(defaultIsOpen);

  return <ModalContext.Provider value={{ isOpen, open, close }}>{children}</ModalContext.Provider>;
};

export default ModalProvider;

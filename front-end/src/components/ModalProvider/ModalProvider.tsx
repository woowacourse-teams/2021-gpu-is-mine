import {  createContext, useContext } from "react";
import useBoolean from "../../hooks/useBoolean/useBoolean";
import { DialogContextProps, DialogProviderProps } from "../../types/dialog";

const ModalContext = createContext({} as DialogContextProps);

export const useModal = () => useContext(ModalContext);

const ModalProvider = ({ defaultIsOpen = false, children }: DialogProviderProps) => {
  const [isOpen, open, close] = useBoolean(defaultIsOpen);

  return <ModalContext.Provider value={{ isOpen, open, close }}>{children}</ModalContext.Provider>;
};

export default ModalProvider;

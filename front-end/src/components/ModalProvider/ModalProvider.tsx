import { ReactNode, createContext, useContext, useState } from "react";

interface ModalContextProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

interface ModalProviderProps {
  defaultIsOpen?: boolean;
  children: ReactNode;
}

const ModalContext = createContext({} as ModalContextProps);

export const useModal = () => useContext(ModalContext);

const ModalProvider = ({ defaultIsOpen = false, children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return <ModalContext.Provider value={{ isOpen, open, close }}>{children}</ModalContext.Provider>;
};

export default ModalProvider;

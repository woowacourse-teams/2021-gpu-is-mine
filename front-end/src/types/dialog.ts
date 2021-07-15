import { ReactNode } from "react";

export interface DialogContextProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export interface DialogProviderProps {
  defaultIsOpen?: boolean;
  children: ReactNode;
}

import { nanoid } from "@reduxjs/toolkit";
import { createContext, FunctionComponent, useCallback, useContext, useState } from "react";
import Portal from "../Portal/Portal";
import ToastComponent from "./Toast";
import { Container } from "./ToastProvider.styled";

export interface Toast {
  title: string;
  message?: string;
  type: "info" | "success" | "warning" | "error";
  duration?: number | null;
}

export interface SettledToast extends Toast {
  id: string;
}

const context = createContext<((toast: Toast) => void) | null>(null);

export const useToast = () => {
  const ctx = useContext(context);

  if (ctx === null) {
    throw new Error(`useToast는 ToastProvider 안에서 호출해주세요`);
  }

  return ctx;
};

const ToastProvider: FunctionComponent = ({ children }) => {
  const [list, setList] = useState<SettledToast[]>([]);

  const showToast = useCallback((toast: Toast) => {
    setList((prev) => [{ id: nanoid(), ...toast }, ...prev]);
  }, []);

  const hideToast = (id: string) => {
    setList((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <context.Provider value={showToast}>
      <Portal>
        <Container>
          {list.map((toast) => (
            <ToastComponent key={toast.id} onClose={() => hideToast(toast.id)} {...toast} />
          ))}
        </Container>
      </Portal>

      {children}
    </context.Provider>
  );
};

export default ToastProvider;

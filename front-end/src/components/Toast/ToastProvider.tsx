import { nanoid } from "@reduxjs/toolkit";
import { createContext, FunctionComponent, useCallback, useContext, useState } from "react";
import Portal from "../Portal/Portal";
import ToastComponent from "./Toast";
import { Container } from "./Toast.styled";

interface Toast {
  id: string;
  title: string;
  message?: string;
  type: "info" | "success" | "warning" | "error";
}

const context = createContext<{
  showToast: ({ title, message, type }: Omit<Toast, "id">) => string;
  hideToast: (id: string) => void;
  list: Toast[];
} | null>(null);

export const useToast = () => {
  const ctx = useContext(context);

  if (ctx === null) {
    throw new Error(`useToast는 ToastProvider 안에서 호출해주세요`);
  }

  return ctx;
};

const ToastProvider: FunctionComponent = ({ children }) => {
  const [list, setList] = useState<Toast[]>([]);

  const showToast = useCallback(({ title, message, type }: Omit<Toast, "id">) => {
    const id = nanoid();

    setList((prev) => [{ id, title, message, type }, ...prev]);

    return id;
  }, []);

  const hideToast = useCallback((id: string) => {
    setList((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const value = { list, showToast, hideToast };

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const ToastContainer = () => {
  const { list, hideToast } = useToast();

  return (
    <Portal>
      <Container>
        {list.map((toast) => (
          <ToastComponent key={toast.id} onClose={() => hideToast(toast.id)} {...toast} />
        ))}
      </Container>
    </Portal>
  );
};

export default ToastProvider;

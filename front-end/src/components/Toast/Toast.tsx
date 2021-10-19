import { ReactNode, useEffect } from "react";
import Portal from "../Portal/Portal";
import { Body, CloseButton, StyledToast } from "./Toast.styled";

interface ToastProps {
  open: boolean;
  onClose: () => void;
  type: "info" | "success" | "warning" | "error";
  delayMs?: number;
  className?: string;
  children: ReactNode;
}

const Toast = ({ type, open, onClose, children, delayMs = 5_000, ...rest }: ToastProps) => {
  useEffect(() => {
    if (open) {
      setTimeout(() => onClose(), delayMs);
    }
  }, [delayMs, onClose, open]);

  return open ? (
    <Portal>
      <StyledToast {...rest}>
        <div>{type}</div>
        <Body>{children}</Body>
        <CloseButton>X</CloseButton>
      </StyledToast>
    </Portal>
  ) : null;
};

export default Toast;

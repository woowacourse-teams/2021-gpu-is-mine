import { useEffect } from "react";
import Text from "../Text/Text";
import CloseIcon from "./closeIcon.svg";
import { Body, CloseButton, StyledToast } from "./Toast.styled";
import ToastTypeIcon from "./ToastTypeIcon/ToastTypeIcon";

interface ToastProps {
  onClose: () => void;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message?: string;
  delayMs?: number;
}

const Toast = ({ type, onClose, title, message, delayMs = 5_000, ...rest }: ToastProps) => {
  useEffect(() => {
    const id = setTimeout(onClose, delayMs);

    return () => clearTimeout(id);
  }, [delayMs, onClose]);

  return (
    <StyledToast type={type} {...rest}>
      <ToastTypeIcon type={type} width="36px" height="36px" />
      <Body>
        <Text weight="medium">{title}</Text>
        {message ? (
          <Text size="sm" weight="light">
            {message}
          </Text>
        ) : null}
      </Body>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>
    </StyledToast>
  );
};

export default Toast;

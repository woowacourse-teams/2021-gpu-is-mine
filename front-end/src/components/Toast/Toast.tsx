import Text from "../Text/Text";
import CloseIcon from "./closeIcon.svg";
import { Body, CloseButton, StyledToast } from "./Toast.styled";
import ToastTypeIcon from "./ToastTypeIcon/ToastTypeIcon";
import type { SettledToast } from "./ToastProvider";

interface ToastProps extends SettledToast {
  onClose: () => void;
}

const Toast = ({ id, type, onClose, title, message, duration = 3_000, ...rest }: ToastProps) => {
  const handleAnimationEnd = () => {
    if (duration === null) {
      return;
    }

    onClose();
  };

  return (
    <StyledToast
      type={type}
      onAnimationEnd={handleAnimationEnd}
      duration={duration}
      role="alert"
      {...rest}
    >
      <ToastTypeIcon type={type} width="36px" height="36px" />
      <Body>
        <Text as="h4" weight="medium">
          {title}
        </Text>
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

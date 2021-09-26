import { ReactNode, MouseEventHandler, MouseEvent, ComponentProps } from "react";
import Dimmer from "../Dimmer/Dimmer";
import Portal from "../Portal/Portal";
import { ButtonWrapper, ContentWrapper, StyledAlert, StyledButton } from "./Alert.styled";

interface AlertProps {
  dimmedColor?: ComponentProps<typeof Dimmer>["color"];
  isOpen?: boolean;
  close?: () => void;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const Alert = ({ dimmedColor, isOpen = true, close, children, onConfirm }: AlertProps) => {
  const handleConfirm = (event: MouseEvent<HTMLButtonElement>) => {
    onConfirm?.(event);
    close?.();
  };

  return isOpen ? (
    <Portal>
      <Dimmer color={dimmedColor}>
        <StyledAlert role="dialog" aria-label="alert">
          <ContentWrapper>{children}</ContentWrapper>
          <ButtonWrapper>
            <StyledButton aria-label="confirm" color="secondary-light" onClick={handleConfirm}>
              확인
            </StyledButton>
          </ButtonWrapper>
        </StyledAlert>
      </Dimmer>
    </Portal>
  ) : null;
};

export default Alert;

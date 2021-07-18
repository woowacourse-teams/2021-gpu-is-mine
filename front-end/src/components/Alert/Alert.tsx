import { ReactNode, MouseEventHandler, MouseEvent, ComponentProps } from "react";
import Button from "../Button/Button";
import Dimmer from "../Dimmer/Dimmer";
import Portal from "../Portal/Portal";
import { AlertWrapper } from "./Alert.styled";

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
        <AlertWrapper>
          <div className="content-wrapper">{children}</div>
          <div className="button-wrapper">
            <Button className="button" color="secondary-light" onClick={handleConfirm}>
              확인
            </Button>
          </div>
        </AlertWrapper>
      </Dimmer>
    </Portal>
  ) : null;
};

export default Alert;

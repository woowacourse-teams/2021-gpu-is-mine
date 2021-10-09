import { ReactNode, MouseEventHandler, MouseEvent, ComponentProps } from "react";
import Dimmer from "../Dimmer/Dimmer";
import Portal from "../Portal/Portal";
import { Inner, Body, Footer, CancelButton, ConfirmButton } from "./Dialog.styled";

interface DialogProps {
  dimmedColor?: ComponentProps<typeof Dimmer>["color"];
  isOpen?: boolean;
  close: () => void;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  type: "alert" | "confirm";
  className?: string;
}

const Dialog = ({
  dimmedColor,
  isOpen = true,
  close,
  children,
  onConfirm,
  onCancel,
  type,
  className,
}: DialogProps) => {
  const handleConfirm = (event: MouseEvent<HTMLButtonElement>) => {
    onConfirm(event);
    close();
  };

  const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
    onCancel?.(event);
    close();
  };

  return isOpen ? (
    <Portal>
      <Dimmer color={dimmedColor}>
        <Inner className={className} aria-describedby="dialog-body">
          <Body id="dialog-body">{children}</Body>
          <Footer>
            {type === "confirm" && <CancelButton onClick={handleCancel}>취소</CancelButton>}
            <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
          </Footer>
        </Inner>
      </Dimmer>
    </Portal>
  ) : null;
};

export default Dialog;

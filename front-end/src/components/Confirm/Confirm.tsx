import { ReactNode, MouseEventHandler, MouseEvent, ComponentProps } from "react";
import Dimmer from "../Dimmer/Dimmer";
import Portal from "../Portal/Portal";
import { Inner, Body, Footer, CancelButton, ConfirmButton } from "./Confirm.styled";

interface ConfirmProps {
  dimmedColor?: ComponentProps<typeof Dimmer>["color"];
  isOpen?: boolean;
  close: () => void;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  type?: "alert" | "confirm";
}

const Confirm = ({
  dimmedColor,
  isOpen = true,
  close,
  children,
  onConfirm,
  onCancel,
  type = "confirm",
}: ConfirmProps) => {
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
        <Inner aria-describedby="dialog-body">
          <Body id="dialog-body">{children}</Body>
          <Footer>
            {type !== "alert" && <CancelButton onClick={handleCancel}>취소</CancelButton>}
            <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
          </Footer>
        </Inner>
      </Dimmer>
    </Portal>
  ) : null;
};

export default Confirm;

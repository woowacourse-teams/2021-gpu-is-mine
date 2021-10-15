import { ReactNode, MouseEventHandler, ComponentProps, HTMLAttributes } from "react";
import Dimmer from "../Dimmer/Dimmer";
import Portal from "../Portal/Portal";
import { Inner, Body, Footer, CancelButton, ConfirmButton } from "./Dialog.styled";

interface DialogProps extends HTMLAttributes<HTMLDialogElement> {
  dimmedColor?: ComponentProps<typeof Dimmer>["color"];
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
}

const Dialog = ({
  dimmedColor,
  children,
  onConfirm,
  onCancel,
  className,
  ...rest
}: DialogProps) => (
  <Portal>
    <Dimmer color={dimmedColor}>
      <Inner className={className} aria-describedby="dialog-body" {...rest}>
        <Body id="dialog-body">{children}</Body>
        <Footer>
          {onCancel ? <CancelButton onClick={onCancel}>취소</CancelButton> : null}
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
        </Footer>
      </Inner>
    </Dimmer>
  </Portal>
);

export default Dialog;

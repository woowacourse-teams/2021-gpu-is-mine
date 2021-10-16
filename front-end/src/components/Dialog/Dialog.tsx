/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  ReactNode,
  HTMLAttributes,
  useRef,
  useEffect,
  ComponentProps,
  KeyboardEventHandler,
  MutableRefObject,
} from "react";
import Dimmer from "../Dimmer/Dimmer";
import Portal from "../Portal/Portal";
import { Inner, Body, Footer, CancelButton, ConfirmButton } from "./Dialog.styled";

interface DialogProps extends HTMLAttributes<HTMLDialogElement> {
  dimmedColor?: ComponentProps<typeof Dimmer>["color"];
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
  children: ReactNode;
  className?: string;
  backdrop?: "static";
}

const useTabTrap = (refs: MutableRefObject<HTMLElement>[]) => {
  const indexRef = useRef(0);

  const onKeyDown: KeyboardEventHandler<HTMLElement> = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();

      if (event.shiftKey) {
        indexRef.current = (indexRef.current - 1 + refs.length) % refs.length;
        refs[indexRef.current].current.focus();
      } else {
        refs[indexRef.current].current.focus();
        indexRef.current = (indexRef.current + 1) % refs.length;
      }
    }
  };

  return onKeyDown;
};

const Dialog = ({
  open,
  onClose,
  dimmedColor,
  children,
  onConfirm,
  onCancel,
  className,
  backdrop,
  ...rest
}: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current!.focus();
    }
  }, [open]);

  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const ButtonRefs = [onCancel && cancelButtonRef, confirmButtonRef].filter(
    Boolean
  ) as MutableRefObject<HTMLElement>[];

  const handleKeyDown = useTabTrap(ButtonRefs);

  return open ? (
    <Portal>
      <Dimmer backdrop={backdrop} onClose={onClose} color={dimmedColor}>
        <Inner
          ref={dialogRef}
          tabIndex={-1}
          className={className}
          onKeyDown={handleKeyDown}
          aria-describedby="dialog-body"
          {...rest}
        >
          <Body id="dialog-body">{children}</Body>
          <Footer>
            {onCancel ? (
              <CancelButton ref={cancelButtonRef} onClick={onCancel}>
                취소
              </CancelButton>
            ) : null}
            <ConfirmButton ref={confirmButtonRef} onClick={onConfirm}>
              확인
            </ConfirmButton>
          </Footer>
        </Inner>
      </Dimmer>
    </Portal>
  ) : null;
};

export default Dialog;

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

interface DialogProps extends HTMLAttributes<HTMLElement> {
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
  let currIndex = 0;

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key !== "Tab") return;

    event.preventDefault();

    if (event.shiftKey) {
      currIndex = (currIndex - 1 + refs.length) % refs.length;
      refs[currIndex].current.focus();
    } else {
      refs[currIndex].current.focus();
      currIndex = (currIndex + 1) % refs.length;
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
  const dialogRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (open) {
      const previousFocusedElement = document.activeElement as HTMLElement;

      dialogRef.current!.focus();

      return () => previousFocusedElement.focus();
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
          role="dialog"
          aria-modal={open}
          {...rest}
        >
          <Body id="dialog-body">{children}</Body>
          <Footer>
            {onCancel ? (
              <CancelButton ref={cancelButtonRef} onClick={onCancel}>
                취소
              </CancelButton>
            ) : null}
            <ConfirmButton ref={confirmButtonRef} onClick={onConfirm} only={!onCancel}>
              확인
            </ConfirmButton>
          </Footer>
        </Inner>
      </Dimmer>
    </Portal>
  ) : null;
};

export default Dialog;

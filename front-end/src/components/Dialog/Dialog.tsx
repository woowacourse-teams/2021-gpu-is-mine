import { ReactNode, HTMLAttributes, useRef, useEffect, useCallback, ComponentProps } from "react";
import Dimmer from "../Dimmer/Dimmer";
import Portal from "../Portal/Portal";
import { Inner, Body, Footer, CancelButton, ConfirmButton } from "./Dialog.styled";

interface DialogProps extends HTMLAttributes<HTMLDialogElement> {
  dimmedColor?: ComponentProps<typeof Dimmer>["color"];
  onConfirm: () => void;
  onCancel?: () => void;
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
}: DialogProps) => {
  const dimmerRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const indexRef = useRef(0);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const Buttons = [onCancel && cancelButtonRef.current, confirmButtonRef.current].filter(
        Boolean
      ) as HTMLElement[];

      if (event.key === "Tab") {
        event.preventDefault();
        Buttons[indexRef.current].focus();
        indexRef.current = (indexRef.current + 1) % Buttons.length;
        return;
      }

      if (event.key === "Escape") {
        onCancel?.();
        // eslint-disable-next-line no-useless-return
        return;
      }
    },
    [onCancel]
  );

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (event.target === dimmerRef.current) {
        onCancel?.();
      }
    },
    [onCancel]
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dialogRef.current!.focus();

    document.addEventListener("click", handleClick);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick, handleKeyDown]);

  return (
    <Portal>
      <Dimmer ref={dimmerRef} color={dimmedColor}>
        <Inner
          ref={dialogRef}
          tabIndex={-1}
          className={className}
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
  );
};

export default Dialog;

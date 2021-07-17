import { ReactNode, MouseEventHandler, MouseEvent } from "react";
import Button from "../Button/Button";
import Dimmer from "../Dimmer/Dimmer";
import Portal from "../Portal/Portal";
import { ConfirmWrapper } from "./Confirm.styled";

interface ConfirmProps {
  isOpen: boolean;
  close: () => void;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const Confirm = ({ isOpen, close, children, onConfirm, onCancel }: ConfirmProps) => {
  const handleConfirm = (event: MouseEvent<HTMLButtonElement>) => {
    onConfirm(event);
    close();
  };

  const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
    onCancel?.(event);
    close();
  };

  return (
    <Portal>
      {isOpen && (
        <Dimmer color="transparent">
          <ConfirmWrapper>
            <div className="content-wrapper">{children}</div>
            <div className="button-wrapper">
              <Button
                color="secondary-light"
                className="button button-wrapper__cancel"
                onClick={handleCancel}
              >
                취소
              </Button>
              <Button
                color="secondary-light"
                className="button button-wrapper__confirm"
                onClick={handleConfirm}
              >
                확인
              </Button>
            </div>
          </ConfirmWrapper>
        </Dimmer>
      )}
    </Portal>
  );
};

export default Confirm;

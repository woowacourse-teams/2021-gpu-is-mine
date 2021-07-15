import { ReactNode, MouseEventHandler, MouseEvent } from "react";
import Button from "../Button/Button";
import Dimmer from "../Dimmer/Dimmer";
import Portal from "../Portal/Portal";
import { useConfirm } from "../ConfirmProvider/ConfirmProvider";
import { ConfirmWrapper } from "./Confirm.styled";

interface ConfirmProps {
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const Confirm = ({ children, onConfirm, onCancel }: ConfirmProps) => {
  const { isOpen, close } = useConfirm();

  const handleConfirm = (event: MouseEvent<HTMLButtonElement>) => {
    onConfirm(event);
    close();
  };

  const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
    onCancel(event);
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

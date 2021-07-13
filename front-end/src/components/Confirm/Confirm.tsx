import React from "react";
import Button from "../Button/Button";
import Portal from "../Portal/Portal";
import Text from "../Text/Text";
import { BackGroundWrapper, ConfirmWrapper } from "./Confirm.styled";

interface ConfirmProps {
  isOpen: boolean;
  text: string;
  onConfirm: React.MouseEventHandler<HTMLButtonElement>;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
}

const Confirm = ({ isOpen, text, onConfirm, onCancel }: ConfirmProps) => (
  <Portal id="confirm">
    {isOpen && (
      <BackGroundWrapper>
        <ConfirmWrapper>
          <div className="text-wrapper">
            <Text size="lg" weight="bold">
              {text}
            </Text>
          </div>
          <div className="button-wrapper">
            <Button color="secondary-light" className="button-wrapper__cancel" onClick={onCancel}>
              취소
            </Button>
            <Button color="secondary-light" className="button-wrapper__confirm" onClick={onConfirm}>
              확인
            </Button>
          </div>
        </ConfirmWrapper>
      </BackGroundWrapper>
    )}
  </Portal>
);

export default Confirm;

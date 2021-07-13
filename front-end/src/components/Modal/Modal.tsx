import React from "react";
import Portal from "../Portal/Portal";
import { ContentsWrapper, Dimmer } from "./Modal.styled";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
}

const Modal = ({ children, isOpen, close }: ModalProps) => {
  const onClickDimmer = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      close();
    }
  };

  return (
    <Portal>
      {isOpen && (
        <Dimmer onClick={onClickDimmer}>
          <ContentsWrapper>{children}</ContentsWrapper>
        </Dimmer>
      )}
    </Portal>
  );
};

export default Modal;

import { ReactNode, MouseEvent } from "react";
import Portal from "../Portal/Portal";
import Dimmer from "../Dimmer/Dimmer";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  close: () => void;
}

const Modal = ({ children, isOpen, close }: ModalProps) => {
  const handleDimmerClick = (event: MouseEvent) => {
    if (event.currentTarget === event.target) {
      close();
    }
  };

  return <Portal>{isOpen && <Dimmer onClick={handleDimmerClick}>{children}</Dimmer>}</Portal>;
};

export default Modal;

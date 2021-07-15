import { ReactNode, MouseEvent } from "react";
import Portal from "../Portal/Portal";
import Dimmer from "../Dimmer/Dimmer";
import { useModal } from "../ModalProvider/ModalProvider";
interface ModalProps {
  children: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const { isOpen, close } = useModal();

  const handleDimmerClick = (event: MouseEvent) => {
    if (event.currentTarget === event.target) {
      close();
    }
  };

  return <Portal>{isOpen && <Dimmer onClick={handleDimmerClick}>{children}</Dimmer>}</Portal>;
};

export default Modal;

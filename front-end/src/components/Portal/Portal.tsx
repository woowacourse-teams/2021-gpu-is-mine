import { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const [elem] = useState(document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(elem);

    return () => {
      document.body.removeChild(elem);
    };
  }, [elem]);

  return ReactDOM.createPortal(children, elem);
};

export default Portal;

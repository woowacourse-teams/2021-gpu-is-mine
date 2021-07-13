import React, { useEffect } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  id?: string;
  children: React.ReactNode;
}

const Portal = ({ children, id }: PortalProps) => {
  const $elem = document.createElement("div");
  $elem.id = id ?? "portal";

  useEffect(() => {
    document.body.appendChild($elem);

    return () => {
      document.body.removeChild($elem);
    };
  }, [$elem]);

  return ReactDOM.createPortal(children, $elem);
};

export default Portal;

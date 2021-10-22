import { SVGAttributes } from "react";
import Info from "./info.svg";
import Success from "./success.svg";
import Warning from "./warning.svg";
import Error from "./error.svg";

interface ToastTypeIconProps extends SVGAttributes<SVGElement> {
  type: "info" | "success" | "warning" | "error";
}

const ToastTypeIcon = ({ type, width, height }: ToastTypeIconProps) => {
  switch (type) {
    case "info":
      return <Info width={width} height={height} />;
    case "success":
      return <Success width={width} height={height} />;
    case "warning":
      return <Warning width={width} height={height} />;
    case "error":
      return <Error width={width} height={height} />;
    default:
      return null;
  }
};

export default ToastTypeIcon;

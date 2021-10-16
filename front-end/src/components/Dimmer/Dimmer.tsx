import { HTMLAttributes, KeyboardEventHandler, MouseEventHandler } from "react";
import { StyledDimmer, Inner } from "./Dimmer.styled";

export type DimmerColor = "transparent" | "light" | "dark";

interface DimmerProps extends HTMLAttributes<HTMLDivElement> {
  color?: DimmerColor;
  onClose?: () => void;
  backdrop?: "static";
}

const Dimmer = ({ color = "light", onClose, backdrop, children, ...rest }: DimmerProps) => {
  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (onClose == null) return;
    if (backdrop === "static") return;
    if (event.target !== event.currentTarget) return;

    onClose();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (onClose == null) return;
    if (backdrop === "static") return;
    if (event.key !== "Escape") return;

    onClose();
  };

  return (
    <StyledDimmer color={color} {...rest} onClick={handleClick} onKeyDown={handleKeyDown}>
      <Inner>{children}</Inner>
    </StyledDimmer>
  );
};

export default Dimmer;

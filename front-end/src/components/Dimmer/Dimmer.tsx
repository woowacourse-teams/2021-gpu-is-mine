import { HTMLAttributes, MouseEventHandler } from "react";
import { StyledDimmer, Inner } from "./Dimmer.styled";

export type DimmerColor = "transparent" | "light" | "dark";

interface DimmerProps extends HTMLAttributes<HTMLDivElement> {
  color?: DimmerColor;
}

const Dimmer = ({ color = "light", children, onClick, ...rest }: DimmerProps) => {
  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === event.currentTarget) {
      onClick?.(event);
    }
  };

  return (
    <StyledDimmer color={color} {...rest} onClick={handleClick}>
      <Inner>{children}</Inner>
    </StyledDimmer>
  );
};

export default Dimmer;

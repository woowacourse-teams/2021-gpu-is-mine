import { forwardRef, HTMLAttributes } from "react";
import { StyledDimmer, Inner } from "./Dimmer.styled";

export type DimmerColor = "transparent" | "light" | "dark";

interface DimmerProps extends HTMLAttributes<HTMLDivElement> {
  color?: DimmerColor;
}

const Dimmer = forwardRef<HTMLDivElement, DimmerProps>(
  ({ color = "light", children, ...rest }, ref) => (
    <StyledDimmer ref={ref} color={color} {...rest}>
      <Inner>{children}</Inner>
    </StyledDimmer>
  )
);

export default Dimmer;

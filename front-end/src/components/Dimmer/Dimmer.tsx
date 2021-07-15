import { HTMLAttributes } from "react";
import { StyledDimmer, StyledDimmerProps } from "./Dimmer.styled";

type DimmerProps = HTMLAttributes<HTMLElement> & Partial<StyledDimmerProps>;

const Dimmer = ({ color = "light", children, ...rest }: DimmerProps) => (
  <StyledDimmer color={color} {...rest}>
    <div className="inner">{children}</div>
  </StyledDimmer>
);

export default Dimmer;

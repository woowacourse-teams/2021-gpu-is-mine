import { HTMLAttributes } from "react";
import { StyledTextProps, StyledText } from "./Text.styled";

type TextProps = HTMLAttributes<HTMLElement> & Partial<StyledTextProps>;

const Text = ({ size = "md", weight = "regular", children, ...rest }: TextProps) => (
  <StyledText size={size} weight={weight} {...rest}>
    {children}
  </StyledText>
);

export default Text;

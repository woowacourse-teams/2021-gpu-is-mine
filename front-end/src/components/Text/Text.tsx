import { HTMLAttributes } from "react";
import { StyledTextProps, StyledText } from "./Text.styled";

type TextProps = HTMLAttributes<HTMLElement> &
  Partial<StyledTextProps> & {
    as?: keyof HTMLElementTagNameMap;
  };

const Text = ({ size = "md", weight = "regular", as = "p", children, ...rest }: TextProps) => (
  <StyledText as={as} size={size} weight={weight} {...rest}>
    {children}
  </StyledText>
);

export default Text;

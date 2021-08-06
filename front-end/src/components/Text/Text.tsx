import { HTMLAttributes } from "react";
import { StyledTextProps, StyledText } from "./Text.styled";

type TextProps = HTMLAttributes<HTMLElement> &
  Partial<StyledTextProps> & {
    as?: keyof HTMLElementTagNameMap;
  };

const Text = ({
  size = "md",
  weight = "regular",
  as = "p",
  color,
  children,
  ...rest
}: TextProps) => (
  <StyledText as={as} size={size} weight={weight} color={color} {...rest}>
    {children}
  </StyledText>
);

export default Text;

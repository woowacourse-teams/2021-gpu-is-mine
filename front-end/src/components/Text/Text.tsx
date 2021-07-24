import { HTMLAttributes } from "react";
import { StyledTextProps, StyledText } from "./Text.styled";

//TODO tag로 prop을 지정하지 않고 StyledComponent Props를 확장하여 tag prop 제거하기
type TextProps = HTMLAttributes<HTMLElement> &
  Partial<StyledTextProps> & {
    tag?: keyof HTMLElementTagNameMap;
  };

const Text = ({ size = "md", weight = "regular", tag = "p", children, ...rest }: TextProps) => (
  <StyledText as={tag} size={size} weight={weight} {...rest}>
    {children}
  </StyledText>
);

export default Text;

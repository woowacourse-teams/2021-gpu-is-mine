import { HTMLAttributes } from "react";
import { StyledText } from "./Text.styled";

export type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type FontWeight = "thin" | "light" | "regular" | "medium" | "bold" | "black";

export type Color = "dark" | "light" | "error";

export type TextProps = HTMLAttributes<HTMLElement> & {
  size?: Size;
  weight?: FontWeight;
  color?: Color;
  as?: keyof HTMLElementTagNameMap;
  srOnly?: boolean;
};

const Text = ({
  size = "md",
  weight = "regular",
  as = "p",
  color,
  srOnly = false,
  children,
  ...rest
}: TextProps) => (
  <StyledText as={as} size={size} weight={weight} color={color} srOnly={srOnly} {...rest}>
    {children}
  </StyledText>
);

export default Text;

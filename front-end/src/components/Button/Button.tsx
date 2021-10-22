import { ButtonHTMLAttributes } from "react";
import { StyledButton } from "./Button.styled";

export type Color =
  | "primary"
  | "primary-light"
  | "primary-dark"
  | "secondary-light"
  | "secondary-dark"
  | "secondary"
  | "error"
  | "inherit";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: Color;
}

const Button = ({ color = "inherit", children, ...rest }: ButtonProps) => (
  <StyledButton color={color} {...rest}>
    {children}
  </StyledButton>
);

export default Button;

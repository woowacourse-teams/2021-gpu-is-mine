import { ButtonHTMLAttributes } from "react";
import { StyledButton, StyledButtonProps } from "./Button.styled";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & StyledButtonProps;

const Button = ({ color, children, ...rest }: ButtonProps) => (
  <StyledButton color={color} {...rest}>
    {children}
  </StyledButton>
);

export default Button;

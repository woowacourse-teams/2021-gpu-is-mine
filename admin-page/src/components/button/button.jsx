import React from "react";
import { StyledButton } from "./button.styled";

const Button = ({ text }) => {
  return <StyledButton type="submit">{text}</StyledButton>;
};

export default Button;

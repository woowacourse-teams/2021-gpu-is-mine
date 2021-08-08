import React from "react";
import { StyledButton } from "./button.styled";

const Button = ({ text, onSubmit }) => {
  return (
    <StyledButton type="submit" onClick={onSubmit}>
      {text}
    </StyledButton>
  );
};

export default Button;

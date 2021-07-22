import { InputHTMLAttributes } from "react";
import { StyledInput } from "./RadioInput.styled";

interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const RadioInput = ({ ...rest }: RadioInputProps) => {
  return <StyledInput {...rest} />;
};

export default RadioInput;

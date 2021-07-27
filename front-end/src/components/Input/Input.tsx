import { InputHTMLAttributes } from "react";
import Text from "../Text/Text";
import { Label, StyledInput, ValidationMessage } from "./Input.styled";
import { Require } from "../../types";

export interface InputProps
  extends Omit<Require<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">, "size"> {
  label: string;
  validationMessage?: string;
  size?: "sm" | "md" | "lg";
}

const validationMessageSize = {
  sm: "xs",
  md: "sm",
  lg: "md",
} as const;

const Input = ({ label, size = "md", value, onChange, validationMessage, ...rest }: InputProps) => (
  <Label size={size}>
    <Text size={size}>{label}</Text>
    <StyledInput
      value={value}
      _size={size}
      onChange={onChange}
      isValid={!validationMessage}
      {...rest}
    />
    <ValidationMessage size={validationMessageSize[size]} weight="medium">
      {validationMessage}
    </ValidationMessage>
  </Label>
);

export default Input;

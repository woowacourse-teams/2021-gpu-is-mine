import { forwardRef, InputHTMLAttributes, useEffect } from "react";
import Text from "../Text/Text";
import { Label, StyledInput, ValidationMessage } from "./Input.styled";
import { Require } from "../../types";

export interface InputProps
  extends Omit<Require<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">, "size"> {
  label: string;
  validationMessage?: string;
  size?: "sm" | "md" | "lg";
  onMount?: () => void;
}

const validationMessageSize = {
  sm: "xs",
  md: "sm",
  lg: "md",
} as const;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, size = "md", value, onChange, onMount, validationMessage, ...rest }, ref) => {
    useEffect(() => {
      onMount?.();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <Label size={size}>
        <Text size={size}>{label}</Text>
        <StyledInput
          value={value}
          _size={size}
          onChange={onChange}
          isValid={!validationMessage}
          ref={ref}
          {...rest}
        />
        <ValidationMessage size={validationMessageSize[size]} weight="medium">
          {validationMessage}
        </ValidationMessage>
      </Label>
    );
  }
);

export default Input;

import { InputHTMLAttributes } from "react";
import cx from "classnames";
import { Label } from "./Input.styled";

import { Require } from "../../types/util";
import Text from "../Text/Text";

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
  <Label className={cx(size, !validationMessage && "valid")}>
    <Text size={size} className="label">
      {label}
    </Text>
    <input className="input" value={value} onChange={onChange} {...rest} />
    <Text size={validationMessageSize[size]} weight="medium" className="validation-message">
      {validationMessage}
    </Text>
  </Label>
);

export default Input;

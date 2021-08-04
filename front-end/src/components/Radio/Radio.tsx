import { InputHTMLAttributes } from "react";
import { SrOnlyLabel, SrOnlyInput, StyledRadio, RadioButton, Content } from "./Radio.styled";
import { Require } from "../../types";

type InputAttributes = "name" | "value" | "onChange" | "checked";

type RadioProps = Require<InputHTMLAttributes<HTMLInputElement>, InputAttributes> & {
  label: string;
  isValid?: boolean;
};

const Radio = ({
  label,
  children,
  disabled = false,
  checked = false,
  isValid = true,
  ...rest
}: RadioProps) => (
  <StyledRadio disabled={disabled}>
    <SrOnlyLabel>{label}</SrOnlyLabel>
    <SrOnlyInput type="radio" disabled={disabled} checked={checked} {...rest} />
    <RadioButton checked={checked} disabled={disabled} isValid={isValid} />
    <Content>{children}</Content>
  </StyledRadio>
);

export default Radio;

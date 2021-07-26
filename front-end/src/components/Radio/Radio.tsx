import { InputHTMLAttributes } from "react";
import { Require } from "../../types";
import { StyledLabel } from "./Radio.styled";

type InputAttributes = "name" | "value" | "onChange" | "checked";

type RadioProps = Require<InputHTMLAttributes<HTMLInputElement>, InputAttributes>;

const Radio = ({ children, disabled = false, ...rest }: RadioProps) => (
  <StyledLabel disabled={disabled}>
    <input type="radio" className="radio__input" disabled={disabled} {...rest} />
    <span className="radio__button" />
    <div className="radio__content">{children}</div>
  </StyledLabel>
);

export default Radio;

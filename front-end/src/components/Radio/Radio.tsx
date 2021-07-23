import { InputHTMLAttributes } from "react";
import { Require } from "../../types";
import { StyledLabel } from "./Radio.styled";

type InputAttributes = "name" | "value" | "onChange" | "checked";

type RadioProps = Require<InputHTMLAttributes<HTMLInputElement>, InputAttributes>;

const Radio = ({ children, ...rest }: RadioProps) => (
  <StyledLabel>
    <input type="radio" className="input" {...rest} />
    <span className="radio-button" />
    <div className="content">{children}</div>
  </StyledLabel>
);

export default Radio;

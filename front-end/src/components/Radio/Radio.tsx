import { InputHTMLAttributes } from "react";
import { Require } from "../../types";
import { StyledLabel } from "./Radio.styled";

type InputAttributes = "name" | "value" | "onChange" | "checked";

interface RadioProps extends Require<InputHTMLAttributes<HTMLInputElement>, InputAttributes> {}

const Radio = ({ children, ...rest }: RadioProps) => {
  return (
    <StyledLabel>
      <input type="radio" className="input" {...rest} />
      <span className="radio-button"></span>
      <div className="content">{children}</div>
    </StyledLabel>
  );
};

export default Radio;

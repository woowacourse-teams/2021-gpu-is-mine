import { HTMLAttributes } from "react";
import { StyledVerticalBox } from "./VerticalBox.styled";

// TODO: flexbox 속성들 props로 받을지 추후 논의
const VerticalBox = ({ children, ...rest }: HTMLAttributes<HTMLElement>) => (
  <StyledVerticalBox {...rest}> {children} </StyledVerticalBox>
);

export default VerticalBox;

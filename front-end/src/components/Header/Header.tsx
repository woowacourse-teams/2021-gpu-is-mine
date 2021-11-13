import { HTMLAttributes } from "react";
import { Logo } from "..";
import { StyledHeader, StyledLabName } from "./Header.styled";

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  labName: string;
  as?: keyof HTMLElementTagNameMap;
}

const Header = ({ labName, children, ...rest }: HeaderProps) => (
  <StyledHeader {...rest}>
    <Logo />
    <StyledLabName size="md" weight="medium">
      {labName}
    </StyledLabName>
  </StyledHeader>
);

export default Header;

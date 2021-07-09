import { HTMLAttributes } from "react";
import Logo from "../Logo/Logo";
import Text from "../Text/Text";
import { StyledHeader } from "./Header.styled";

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  labName: string;
}

const Header = ({ labName, children, ...rest }: HeaderProps) => (
  <StyledHeader {...rest}>
    <Logo />

    <Text className="lab-name" size="md" weight="medium">
      {labName}
    </Text>

    {children}
  </StyledHeader>
);

export default Header;

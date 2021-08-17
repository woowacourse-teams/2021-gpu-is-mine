import { HTMLAttributes } from "react";
import { Logo, Text } from "../../components";
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
    </StyledHeader>
  );

export default Header;

import { HTMLAttributes } from "react";
import Logo from "../../components/Logo/Logo";
import Text from "../../components/Text/Text";
import { StyledManagerHeader } from "./ManagerHeader.styled";

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  labName: string;
}

const ManagerHeader = ({ labName, children, ...rest }: HeaderProps) => (
  <StyledManagerHeader {...rest}>
    <Logo />
    <Text className="lab-name" size="md" weight="medium">
      {labName}
    </Text>
  </StyledManagerHeader>
);

export default ManagerHeader;

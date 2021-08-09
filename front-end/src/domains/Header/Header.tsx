import { HTMLAttributes } from "react";
import { useAuth } from "../../hooks";
import { Logo, Text } from "../../components";
import { StyledManagerHeader } from "./Header.styled";

type HeaderProps = HTMLAttributes<HTMLElement>;

const ManagerHeader = ({ children, ...rest }: HeaderProps) => {
  const { myInfo } = useAuth();

  return (
    <StyledManagerHeader {...rest}>
      <Logo />
      <Text className="lab-name" size="md" weight="medium">
        {myInfo?.labResponse.name}
      </Text>
    </StyledManagerHeader>
  );
};

export default ManagerHeader;

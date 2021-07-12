import { HTMLAttributes, MouseEventHandler } from "react";
import Text from "../../components/Text/Text";
import { StyledManagerHeader } from "./ManagerSubHeader.styled";

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  labName: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ManagerSubHeader = ({ labName, onClick, children, ...rest }: HeaderProps) => (
  <StyledManagerHeader {...rest}>
    <Text size="md">{"GPU 서버 관리 > 조회"}</Text>
    <Text className="lab-name" size="md" weight="medium">
      {labName}
    </Text>
    <button type="button" className="down-arrow" onClick={onClick}>
      ▼
    </button>
  </StyledManagerHeader>
);

export default ManagerSubHeader;

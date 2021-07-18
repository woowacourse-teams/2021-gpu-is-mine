import { HTMLAttributes, MouseEventHandler } from "react";
import { Link, useLocation } from "react-router-dom";
import { Text } from "../../components";
import { StyledManagerSubHeader } from "./ManagerSubHeader.styled";
import { PATH } from "../../constants";

interface SubHeaderProps extends HTMLAttributes<HTMLElement> {
  labName: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const DomainMapper: Record<keyof typeof PATH.MANAGER, string> = {
  GPU_SERVER: "GPU 서버 관리",
};

const PageMapper: Record<keyof typeof PATH.MANAGER.GPU_SERVER, string> = {
  VIEW: "조회",
  REGISTER: "등록",
} as const;

const transformPath = (path: string): string => path.toUpperCase().replace("-", "_");

const ManagerSubHeader = ({ labName, onClick, children, ...rest }: SubHeaderProps) => {
  const { pathname } = useLocation();

  const [, , domain, page] = pathname.split("/").map(transformPath) as [
    never,
    never,
    keyof typeof DomainMapper,
    keyof typeof PageMapper
  ];

  return (
    <StyledManagerSubHeader {...rest}>
      <div className="title">
        <Link to={pathname.split("/").slice(0, -1).join("/")}>
          <Text className="title__domain" size="md">
            {DomainMapper[domain]}
          </Text>
        </Link>
        <Text size="md">{">"}</Text>
        <Link to={pathname}>
          <Text className="title__page" size="md">
            {PageMapper[page]}
          </Text>
        </Link>
      </div>

      <Text className="lab-name" size="md" weight="medium">
        {labName}
      </Text>
      <button type="button" className="down-arrow" onClick={onClick}>
        ▼
      </button>
    </StyledManagerSubHeader>
  );
};

export default ManagerSubHeader;

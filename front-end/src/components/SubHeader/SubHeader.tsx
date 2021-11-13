import { Fragment, HTMLAttributes } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { selectMyInfo } from "../../features/member/authSlice";
import { useBreakpoints, usePathTitle, useToggle } from "../../hooks";
import { useAppSelector } from "../../app/hooks";
import { Text } from "../../components";
import {
  StyledSubHeader,
  StyledUserNavigation,
  StyledManagerNavigation,
  StyledButton,
  TitleName,
  Title,
} from "./SubHeader.styled";

type SubHeaderProps = HTMLAttributes<HTMLElement>;

const getDomainName = (domain: string) =>
  ({
    "gpu-server": "GPU 서버 관리",
    job: "Job 관리",
  }[domain] ?? "");

const getPageName = (page: string) =>
  ({
    view: "조회",
    register: "등록",
  }[page] ?? "");

const useParsePathname = ({
  pathname,
  jobId,
  serverId,
}: {
  pathname: string;
  jobId: string | undefined;
  serverId: string | undefined;
}) => {
  const detailId = (jobId || serverId) ?? "";

  const [, domain, page] = pathname.split("/");

  const domainPath = ["", domain, "view"].join("/");
  const pagePath = ["", domain, page].join("/");
  const detailPath = ["", domain, page, detailId].join("/");

  const domainName = getDomainName(domain);
  const pageName = getPageName(page);

  return [
    { path: domainPath, name: domainName },
    { path: pagePath, name: pageName },
    { path: detailPath, name: detailId },
  ].filter(({ name }) => Boolean(name));
};

const SubHeader = ({ children, ...rest }: SubHeaderProps) => {
  const { labName, memberType } = useAppSelector(selectMyInfo);
  const { pathname } = useLocation();
  const { jobId, serverId } = useParams<{ jobId?: string; serverId?: string }>();
  const list = useParsePathname({
    pathname,
    jobId,
    serverId,
  });

  const heading = usePathTitle();

  const { isMobile, isTablet } = useBreakpoints();

  const isLessThanLaptop = isMobile || isTablet;

  const [isNavVisible, toggleIsNavVisible] = useToggle(false);

  return (
    <>
      <StyledSubHeader {...rest} onClick={() => toggleIsNavVisible()} tabIndex={-1}>
        <Text as="h2" srOnly>
          {heading}
        </Text>
        <Title>
          {list.map(({ path, name }, index) => (
            <Fragment key={name}>
              {index > 0 && <Text size="md">{">"}</Text>}
              <Link to={path}>
                <TitleName size="md" weight="medium">
                  {name}
                </TitleName>
              </Link>
            </Fragment>
          ))}
        </Title>

        {isLessThanLaptop ? (
          <StyledButton type="button">{isNavVisible ? "▲" : "▼"}</StyledButton>
        ) : (
          <Text size="md" weight="medium">
            {labName}
          </Text>
        )}
      </StyledSubHeader>

      {isLessThanLaptop &&
        isNavVisible &&
        (memberType === "MANAGER" ? (
          <StyledManagerNavigation />
        ) : memberType === "USER" ? (
          <StyledUserNavigation />
        ) : null)}
    </>
  );
};

export default SubHeader;

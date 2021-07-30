import { Fragment, HTMLAttributes } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth, useToggle } from "../../hooks";
import { Text } from "../../components";
import { StyledManagerSubHeader, StyledManagerNavigation } from "./ManagerSubHeader.styled";

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

  const [, member, domain, page] = pathname.split("/");

  const domainPath = ["", member, domain, "view"].join("/");
  const pagePath = ["", member, domain, page].join("/");
  const detailPath = ["", member, domain, page, detailId].join("/");

  const domainName = getDomainName(domain);
  const pageName = getPageName(page);

  return [
    { path: domainPath, name: domainName },
    { path: pagePath, name: pageName },
    { path: detailPath, name: detailId },
  ].filter(({ name }) => Boolean(name));
};

const ManagerSubHeader = ({ children, ...rest }: SubHeaderProps) => {
  const { myInfo } = useAuth();
  const { pathname } = useLocation();
  const { jobId, serverId } = useParams<{ jobId?: string; serverId?: string }>();
  const list = useParsePathname({
    pathname,
    jobId,
    serverId,
  });

  const [isNavVisible, toggleIsNavVisible] = useToggle(false);

  return (
    <>
      <StyledManagerSubHeader {...rest}>
        <div className="title">
          {list.map(({ path, name }, index) => (
            <Fragment key={name}>
              {index > 0 && <Text size="md">{">"}</Text>}
              <Link to={path}>
                <Text className="title__name" size="md">
                  {name}
                </Text>
              </Link>
            </Fragment>
          ))}
        </div>

        <Text className="lab-name" size="md" weight="medium">
          {myInfo?.labResponse.name}
        </Text>
        <button type="button" className="down-arrow" onClick={toggleIsNavVisible}>
          {isNavVisible ? "▲" : "▼"}
        </button>
      </StyledManagerSubHeader>
      {isNavVisible && <StyledManagerNavigation />}
    </>
  );
};

export default ManagerSubHeader;

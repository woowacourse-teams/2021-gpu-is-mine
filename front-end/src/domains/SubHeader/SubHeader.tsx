import { Fragment, HTMLAttributes } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useMyInfo, usePathTitle, useToggle } from "../../hooks";
import { Text } from "../../components";
import { StyledSubHeader, StyledManagerNavigation } from "./SubHeader.styled";

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
  const myInfo = useMyInfo();
  const { pathname } = useLocation();
  const { jobId, serverId } = useParams<{ jobId?: string; serverId?: string }>();
  const list = useParsePathname({
    pathname,
    jobId,
    serverId,
  });

  const heading = usePathTitle();

  const [isNavVisible, toggleIsNavVisible] = useToggle(false);

  return (
    <>
      <StyledSubHeader {...rest}>
        <Text as="h2" srOnly>
          {heading}
        </Text>
        <div className="title">
          {list.map(({ path, name }, index) => (
            <Fragment key={name}>
              {index > 0 && <Text size="md">{">"}</Text>}
              <Link to={path}>
                <Text className="title__name" size="md" weight="medium">
                  {name}
                </Text>
              </Link>
            </Fragment>
          ))}
        </div>

        <Text className="lab-name" size="md" weight="medium">
          {myInfo.labName}
        </Text>
        <button type="button" className="down-arrow" onClick={() => toggleIsNavVisible()}>
          {isNavVisible ? "▲" : "▼"}
        </button>
      </StyledSubHeader>
      {isNavVisible && <StyledManagerNavigation />}
    </>
  );
};

export default SubHeader;

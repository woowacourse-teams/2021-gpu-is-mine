import { useMyInfo } from "../../hooks";
import { Layout } from "../../components";
import { Header, SubHeader } from "../../domains/Common";
import { ManagerNavigation } from "../../domains/Manager";
import { UserNavigation } from "../../domains/User";
import { JobInfoList } from "../../domains/Job";

const JobView = () => {
  const { labId, labName, memberType, memberId } = useMyInfo();

  return (
    <Layout
      Header={<Header as="div" labName={labName} />}
      SubHeader={<SubHeader />}
      Aside={memberType === "MANAGER" ? <ManagerNavigation /> : <UserNavigation />}
      Main={<JobInfoList labId={labId} memberId={memberId} memberType={memberType} />}
    />
  );
};

export default JobView;

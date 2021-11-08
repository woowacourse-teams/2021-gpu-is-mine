import { useMyInfo } from "../../hooks";
import { Layout, Header, SubHeader, ManagerNavigation, UserNavigation } from "../../components";
import { JobDetail } from "../../features/job";

const JobViewDetail = () => {
  const { labName, memberType } = useMyInfo();

  return (
    <Layout
      Header={<Header as="div" labName={labName} />}
      SubHeader={<SubHeader />}
      Aside={memberType === "MANAGER" ? <ManagerNavigation /> : <UserNavigation />}
      Main={<JobDetail />}
    />
  );
};

export default JobViewDetail;

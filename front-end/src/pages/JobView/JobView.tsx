import { useMyInfo } from "../../hooks";
import { Layout, Header, SubHeader } from "../../components";
import { ManagerNavigation } from "../../domains/Manager";
import { UserNavigation } from "../../domains/User";
import { JobInfoList } from "../../features/job";

const JobView = () => {
  const { labName, memberType } = useMyInfo();

  return (
    <Layout
      Header={<Header as="div" labName={labName} />}
      SubHeader={<SubHeader />}
      Aside={memberType === "MANAGER" ? <ManagerNavigation /> : <UserNavigation />}
      Main={<JobInfoList />}
    />
  );
};

export default JobView;

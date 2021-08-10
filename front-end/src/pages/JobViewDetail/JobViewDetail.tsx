import { useMyInfo } from "../../hooks";
import { Layout } from "../../components";
import { Header, SubHeader } from "../../domains/Common";
import { ManagerNavigation } from "../../domains/Manager";
import { UserNavigation } from "../../domains/User";
import { JobDetail } from "../../domains/Job";

const JobViewDetail = () => {
  const { labId, labName, memberType } = useMyInfo();

  return (
    <Layout
      Header={<Header labName={labName} />}
      SubHeader={<SubHeader />}
      Navigation={memberType === "MANAGER" ? <ManagerNavigation /> : <UserNavigation />}
      Content={<JobDetail labId={labId} />}
    />
  );
};

export default JobViewDetail;

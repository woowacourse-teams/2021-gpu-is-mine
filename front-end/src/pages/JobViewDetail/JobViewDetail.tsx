import { useMyInfo } from "../../hooks";
import { Layout } from "../../components";
import { ManagerNavigation, ManagerHeader, ManagerSubHeader } from "../../domains/Manager";
import { UserNavigation } from "../../domains/User";
import { JobDetail } from "../../domains/Job";

const JobViewDetail = () => {
  const { labId, memberType } = useMyInfo();

  return (
    <Layout
      Header={<ManagerHeader />}
      SubHeader={<ManagerSubHeader />}
      Navigation={memberType === "MANAGER" ? <ManagerNavigation /> : <UserNavigation />}
      Content={<JobDetail labId={labId} />}
    />
  );
};

export default JobViewDetail;

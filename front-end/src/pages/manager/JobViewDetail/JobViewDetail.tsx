import { useLabId } from "../../../hooks";
import { Layout } from "../../../components";
import { ManagerNavigation, ManagerHeader, ManagerSubHeader } from "../../../domains/Manager";
import { JobDetail } from "../../../domains/Job";

const JobViewDetail = () => {
  const labId = useLabId();

  return (
    <Layout
      Header={<ManagerHeader />}
      SubHeader={<ManagerSubHeader />}
      Navigation={<ManagerNavigation />}
      Content={<JobDetail labId={labId} />}
    />
  );
};

export default JobViewDetail;

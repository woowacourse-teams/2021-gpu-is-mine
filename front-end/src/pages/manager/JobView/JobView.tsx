import { Layout } from "../../../components";
import { ManagerNavigation, ManagerHeader, ManagerSubHeader } from "../../../domains/Manager";
import { JobInfoList } from "../../../domains/Job";

const JobView = () => {
  const labName = "GPU내꼬야Lab";

  return (
    <Layout
      Header={<ManagerHeader labName={labName} />}
      SubHeader={<ManagerSubHeader labName={labName} />}
      Navigation={<ManagerNavigation />}
      Content={<JobInfoList />}
    />
  );
};

export default JobView;

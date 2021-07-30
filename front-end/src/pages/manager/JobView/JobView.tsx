import { Layout } from "../../../components";
import { ManagerNavigation, ManagerHeader, ManagerSubHeader } from "../../../domains/Manager";
import { JobInfoList } from "../../../domains/Job";

const JobView = () => (
  <Layout
    Header={<ManagerHeader />}
    SubHeader={<ManagerSubHeader />}
    Navigation={<ManagerNavigation />}
    Content={<JobInfoList />}
  />
);

export default JobView;

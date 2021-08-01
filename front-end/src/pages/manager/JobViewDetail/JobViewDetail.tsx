import { Layout } from "../../../components";
import { ManagerNavigation, ManagerHeader, ManagerSubHeader } from "../../../domains/Manager";
import { JobDetail } from "../../../domains/Job";

const JobViewDetail = () => (
  <Layout
    Header={<ManagerHeader />}
    SubHeader={<ManagerSubHeader />}
    Navigation={<ManagerNavigation />}
    Content={<JobDetail />}
  />
);

export default JobViewDetail;

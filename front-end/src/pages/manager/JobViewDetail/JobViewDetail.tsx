import { Layout } from "../../../components";
import { ManagerNavigation, ManagerHeader, ManagerSubHeader } from "../../../domains/Manager";
import { JobInfoItemDetail } from "../../../domains/Job";

const JobViewDetail = () => (
  <Layout
    Header={<ManagerHeader />}
    SubHeader={<ManagerSubHeader />}
    Navigation={<ManagerNavigation />}
    Content={<JobInfoItemDetail />}
  />
);

export default JobViewDetail;

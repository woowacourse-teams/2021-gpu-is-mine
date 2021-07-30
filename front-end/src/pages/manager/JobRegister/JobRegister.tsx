import { Layout } from "../../../components";
import { ManagerNavigation, ManagerHeader, ManagerSubHeader } from "../../../domains/Manager";
import { JobRegisterForm } from "../../../domains/Job";

const JobRegister = () => (
  <Layout
    Header={<ManagerHeader />}
    SubHeader={<ManagerSubHeader />}
    Navigation={<ManagerNavigation />}
    Content={<JobRegisterForm />}
  />
);

export default JobRegister;

import { Layout } from "../../../components";
import { ManagerNavigation, ManagerHeader, ManagerSubHeader } from "../../../domains/Manager";
import { JobRegisterForm } from "../../../domains/Job";

const JobRegister = () => {
  const labName = "GPU내꼬야Lab";

  return (
    <Layout
      Header={<ManagerHeader labName={labName} />}
      SubHeader={<ManagerSubHeader labName={labName} />}
      Navigation={<ManagerNavigation />}
      Content={<JobRegisterForm />}
    />
  );
};

export default JobRegister;

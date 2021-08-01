import { Layout } from "../../../components";
import { useLabId } from "../../../hooks";
import { ManagerNavigation, ManagerHeader, ManagerSubHeader } from "../../../domains/Manager";
import { JobRegisterForm } from "../../../domains/Job";

const JobRegister = () => {
  const labId = useLabId();

  return (
    <Layout
      Header={<ManagerHeader />}
      SubHeader={<ManagerSubHeader />}
      Navigation={<ManagerNavigation />}
      Content={<JobRegisterForm labId={labId} />}
    />
  );
};

export default JobRegister;

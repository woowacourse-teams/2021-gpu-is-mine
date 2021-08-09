import { useLabId, useMyInfo } from "../../hooks";
import { Layout } from "../../components";
import { ManagerNavigation, ManagerHeader, ManagerSubHeader } from "../../domains/Manager";
import { UserNavigation } from "../../domains/User";

import { JobRegisterForm } from "../../domains/Job";

const JobRegister = () => {
  const labId = useLabId();
  const { memberType } = useMyInfo();

  return (
    <Layout
      Header={<ManagerHeader />}
      SubHeader={<ManagerSubHeader />}
      Navigation={memberType === "MANAGER" ? <ManagerNavigation /> : <UserNavigation />}
      Content={<JobRegisterForm labId={labId} />}
    />
  );
};

export default JobRegister;

import { useMyInfo } from "../../hooks";
import { Layout } from "../../components";
import { Header, SubHeader } from "../../domains/Common";
import { ManagerNavigation } from "../../domains/Manager";
import { UserNavigation } from "../../domains/User";
import { JobRegisterForm } from "../../domains/Job";

const JobRegister = () => {
  const { labId, labName, memberType } = useMyInfo();

  return (
    <Layout
      Header={<Header as="div" labName={labName} />}
      SubHeader={<SubHeader />}
      Aside={memberType === "MANAGER" ? <ManagerNavigation /> : <UserNavigation />}
      Main={<JobRegisterForm labId={labId} />}
    />
  );
};

export default JobRegister;

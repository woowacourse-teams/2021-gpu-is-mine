import { selectMyInfo } from "../../features/member/authSlice";
import { useAppSelector } from "../../app/hooks";
import { Layout, Header, SubHeader, ManagerNavigation, UserNavigation } from "../../components";
import { JobRegisterForm } from "../../features/job";

const JobRegister = () => {
  const { labId, labName, memberType } = useAppSelector(selectMyInfo);

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

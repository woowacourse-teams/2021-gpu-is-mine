import { selectMyInfo } from "../../features/member/authSlice";
import { useAppSelector } from "../../app/hooks";
import { Layout } from "../../components";
import { Header, SubHeader } from "../../domains/Common";
import { ManagerNavigation } from "../../domains/Manager";
import { UserNavigation } from "../../domains/User";
import { JobInfoList } from "../../features/job";

const JobView = () => {
  const { labName, memberType } = useAppSelector(selectMyInfo);

  return (
    <Layout
      Header={<Header as="div" labName={labName} />}
      SubHeader={<SubHeader />}
      Aside={memberType === "MANAGER" ? <ManagerNavigation /> : <UserNavigation />}
      Main={<JobInfoList />}
    />
  );
};

export default JobView;

import { Layout } from "../../components";
import { selectMyInfo } from "../../features/member/authSlice";
import { useAppSelector } from "../../app/hooks";
import { Header, SubHeader } from "../../domains/Common";
import { ManagerNavigation } from "../../domains/Manager";
import { UserNavigation } from "../../domains/User";
import { GpuServerInfoList } from "../../features/gpuServer";

const GpuServerView = () => {
  const { labName, memberType } = useAppSelector(selectMyInfo);

  return (
    <Layout
      Header={<Header as="div" labName={labName} />}
      SubHeader={<SubHeader />}
      Aside={memberType === "MANAGER" ? <ManagerNavigation /> : <UserNavigation />}
      Main={<GpuServerInfoList />}
    />
  );
};

export default GpuServerView;

import { Layout } from "../../components";
import { Header, SubHeader } from "../../domains/Common";
import { ManagerNavigation } from "../../domains/Manager";
import { UserNavigation } from "../../domains/User";
import { GpuServerInfoList } from "../../domains/GpuServer";
import { useAppSelector } from "../../app/hooks";
import { selectMyInfo } from "../../features/member/authSlice";

const GpuServerView = () => {
  const { labId, labName, memberType } = useAppSelector(selectMyInfo);

  return (
    <Layout
      Header={<Header as="div" labName={labName} />}
      SubHeader={<SubHeader />}
      Aside={memberType === "MANAGER" ? <ManagerNavigation /> : <UserNavigation />}
      Main={<GpuServerInfoList labId={labId} memberType={memberType} />}
    />
  );
};

export default GpuServerView;

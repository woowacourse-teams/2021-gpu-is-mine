import { useMyInfo } from "../../hooks";
import { Layout } from "../../components";
import { Header, SubHeader } from "../../domains/Common";
import { ManagerNavigation } from "../../domains/Manager";
import { UserNavigation } from "../../domains/User";
import { GpuServerInfoList } from "../../domains/GpuServer";

const GpuServerView = () => {
  const { labId, labName, memberType } = useMyInfo();

  return (
    <Layout
      Header={<Header labName={labName} />}
      SubHeader={<SubHeader />}
      Navigation={memberType === "MANAGER" ? <ManagerNavigation /> : <UserNavigation />}
      Content={<GpuServerInfoList labId={labId} memberType={memberType} />}
    />
  );
};

export default GpuServerView;

import { useMyInfo } from "../../hooks";
import { Layout } from "../../components";
import { ManagerNavigation, ManagerHeader, ManagerSubHeader } from "../../domains/Manager";
import { UserNavigation } from "../../domains/User";
import { GpuServerInfoList } from "../../domains/GpuServer";

const GpuServerView = () => {
  const {
    labResponse: { id: labId },
    memberType,
  } = useMyInfo();

  return (
    <Layout
      Header={<ManagerHeader />}
      SubHeader={<ManagerSubHeader />}
      Navigation={memberType === "MANAGER" ? <ManagerNavigation /> : <UserNavigation />}
      Content={<GpuServerInfoList labId={labId} memberType={memberType} />}
    />
  );
};

export default GpuServerView;

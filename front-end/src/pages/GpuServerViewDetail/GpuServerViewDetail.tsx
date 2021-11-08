import { useMyInfo, useServerId } from "../../hooks";
import { Layout, Header, SubHeader } from "../../components";
import { ManagerNavigation } from "../../domains/Manager";
import { UserNavigation } from "../../domains/User";
import { GpuServerDetail } from "../../features/gpuServer";

const GpuServerViewDetail = () => {
  const { labName, memberType } = useMyInfo();
  const serverId = useServerId();

  return (
    <Layout
      Header={<Header as="div" labName={labName} />}
      SubHeader={<SubHeader />}
      Aside={memberType === "MANAGER" ? <ManagerNavigation /> : <UserNavigation />}
      Main={<GpuServerDetail serverId={serverId} />}
    />
  );
};

export default GpuServerViewDetail;

import { useMyInfo } from "../../hooks";
import { Layout } from "../../components";
import { Header, SubHeader } from "../../domains/Common";
import { ManagerNavigation } from "../../domains/Manager";
import { UserNavigation } from "../../domains/User";
import { GpuServerDetail } from "../../features/gpuServer";

const GpuServerViewDetail = () => {
  const { labId, labName, memberType } = useMyInfo();

  return (
    <Layout
      Header={<Header as="div" labName={labName} />}
      SubHeader={<SubHeader />}
      Aside={memberType === "MANAGER" ? <ManagerNavigation /> : <UserNavigation />}
      Main={<GpuServerDetail labId={labId} />}
    />
  );
};

export default GpuServerViewDetail;

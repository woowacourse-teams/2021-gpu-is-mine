import { useMyInfo } from "../../hooks";
import { Layout } from "../../components";
import { Header, SubHeader } from "../../domains/Common";
import { ManagerNavigation } from "../../domains/Manager";
import { UserNavigation } from "../../domains/User";
import { GpuServerDetail } from "../../domains/GpuServer";

const GpuServerViewDetail = () => {
  const { labId, labName, memberType } = useMyInfo();

  return (
    <Layout
      Header={<Header labName={labName} />}
      SubHeader={<SubHeader />}
      Navigation={memberType === "MANAGER" ? <ManagerNavigation /> : <UserNavigation />}
      Content={<GpuServerDetail labId={labId} />}
    />
  );
};

export default GpuServerViewDetail;

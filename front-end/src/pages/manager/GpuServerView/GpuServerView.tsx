import { useMyInfo } from "../../../hooks";
import { Layout } from "../../../components";
import { ManagerNavigation, ManagerHeader, ManagerSubHeader } from "../../../domains/Manager";
import { GpuServerInfoList } from "../../../domains/GpuServer";

const GpuServerView = () => {
  const {
    labResponse: { id: labId },
    memberType,
  } = useMyInfo();

  return (
    <Layout
      Header={<ManagerHeader />}
      SubHeader={<ManagerSubHeader />}
      Navigation={<ManagerNavigation />}
      Content={<GpuServerInfoList labId={labId} memberType={memberType} />}
    />
  );
};

export default GpuServerView;

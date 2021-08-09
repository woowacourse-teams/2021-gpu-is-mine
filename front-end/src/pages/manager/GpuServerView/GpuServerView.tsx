import { useMyInfo } from "../../../hooks";
import { Layout } from "../../../components";
import { ManagerNavigation, ManagerHeader, ManagerSubHeader } from "../../../domains/Manager";
import { GpuServerInfoList } from "../../../domains/GpuServer";

const GpuServerView = () => {
  const myInfo = useMyInfo();

  return (
    <Layout
      Header={<ManagerHeader />}
      SubHeader={<ManagerSubHeader />}
      Navigation={<ManagerNavigation />}
      Content={<GpuServerInfoList />}
    />
  );
};

export default GpuServerView;

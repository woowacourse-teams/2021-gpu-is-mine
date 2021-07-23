import { Layout } from "../../../components";
import { ManagerNavigation, ManagerHeader, ManagerSubHeader } from "../../../domains/Manager";
import { GpuServerInfoList } from "../../../domains/GpuServer";

const GpuServerView = () => {
  const labName = "GPU내꼬야Lab";

  return (
    <Layout
      Header={<ManagerHeader labName={labName} />}
      SubHeader={<ManagerSubHeader labName={labName} />}
      Navigation={<ManagerNavigation />}
      Content={<GpuServerInfoList />}
    />
  );
};

export default GpuServerView;

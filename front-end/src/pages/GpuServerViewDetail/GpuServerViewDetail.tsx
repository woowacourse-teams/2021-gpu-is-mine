import { useEffect } from "react";
import { useMyInfo, useServerId } from "../../hooks";
import { Layout } from "../../components";
import { Header, SubHeader } from "../../domains/Common";
import { ManagerNavigation } from "../../domains/Manager";
import { UserNavigation } from "../../domains/User";
import { GpuServerDetail } from "../../features/gpuServer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchGpuServerById, selectGpuServerStatus } from "../../features/gpuServer/gpuServerSlice";

const GpuServerViewDetail = () => {
  const { labName, memberType } = useMyInfo();
  const serverId = useServerId();

  const { isSucceed } = useAppSelector((state) => selectGpuServerStatus(state, fetchGpuServerById));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGpuServerById(serverId));
  }, [dispatch, serverId]);

  return (
    <Layout
      Header={<Header as="div" labName={labName} />}
      SubHeader={<SubHeader />}
      Aside={memberType === "MANAGER" ? <ManagerNavigation /> : <UserNavigation />}
      Main={isSucceed && <GpuServerDetail serverId={serverId} />}
    />
  );
};

export default GpuServerViewDetail;

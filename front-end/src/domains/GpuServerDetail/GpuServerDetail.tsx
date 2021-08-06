import { Text } from "../../components";
import { useGetGpuServerById } from "../../hooks";
import { getCurrentJob, getWaitingJob } from "./useGpuServerDetail";

interface GpuServerDetailProps {
  className?: string;
  labId: number;
}

const GpuServerDetail = ({ labId, ...rest }: GpuServerDetailProps) => {
  const { data } = useGetGpuServerById({ labId, serverId: 1 });

  return (
    <div {...rest}>
      {data && (
        <>
          <Text>GPU 연산량</Text>
          <Text>{data.gpuBoard.performance}</Text>
          <Text>현재 실행중인 Job</Text>
          <Text>{getCurrentJob(data)?.name ?? "N/A"}</Text>
          <Text>대기 중인 Job 개수</Text>
          <Text>{`${getWaitingJob(data)?.length}개` ?? "N/A"}</Text>
        </>
      )}
    </div>
  );
};

export default GpuServerDetail;

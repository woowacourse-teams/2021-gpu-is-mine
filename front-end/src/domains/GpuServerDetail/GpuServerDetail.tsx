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
          <Text>서버 이름</Text>
          <Text>{data.serverName}</Text>
          <Text>서버 상태</Text>
          <Text>{data.isOn ? "ON" : "OFF"}</Text>
          <Text>RAM 용량</Text>
          <Text>{data.memorySize}</Text>
          <Text>디스크 용량</Text>
          <Text>{data.diskSize}</Text>
          <Text>GPU 장치명</Text>
          <Text>{data.gpuBoard.modelName}</Text>
          <Text>성능(TFLOPS)</Text>
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

import { Text } from "../../components";
import {
  getCurrentJob,
  getWaitingJob,
  useServerId,
  useGpuServerDetail,
} from "./useGpuServerDetail";

interface GpuServerDetailProps {
  className?: string;
  labId: number;
}

const GpuServerDetail = ({ labId, ...rest }: GpuServerDetailProps) => {
  const serverId = useServerId();

  const { detail } = useGpuServerDetail({ labId, serverId });

  return (
    <div {...rest}>
      {detail && (
        <>
          <Text>서버 이름</Text>
          <Text>{detail.serverName}</Text>
          <Text>서버 상태</Text>
          <Text>{detail.isOn ? "ON" : "OFF"}</Text>
          <Text>RAM 용량</Text>
          <Text>{detail.memorySize}</Text>
          <Text>디스크 용량</Text>
          <Text>{detail.diskSize}</Text>
          <Text>GPU 장치명</Text>
          <Text>{detail.gpuBoard.modelName}</Text>
          <Text>성능(TFLOPS)</Text>
          <Text>{detail.gpuBoard.performance}</Text>
          <Text>현재 실행중인 Job</Text>
          <Text>{getCurrentJob(detail)?.name ?? "N/A"}</Text>
          <Text>대기 중인 Job 개수</Text>
          <Text>{`${getWaitingJob(detail)?.length}개` ?? "N/A"}</Text>
        </>
      )}
    </div>
  );
};

export default GpuServerDetail;

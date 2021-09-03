import { Flicker, Text } from "../../components";
import { getCurrentJob, getWaitingJob } from "./useGpuServerDetailSummary";
import { ServerNameBox, StyledGpuServerDetailSummary } from "./GpuServerDetailSummary.styled";
import { GpuServer } from "../../types";

interface GpuServerDetailSummaryProps {
  className?: string;
  labId: number;
  serverId: number;
  detail: GpuServer;
}

const GpuServerDetailSummary = ({
  labId,
  serverId,
  detail,
  ...rest
}: GpuServerDetailSummaryProps) => (
  <StyledGpuServerDetailSummary {...rest}>
    <ServerNameBox>
      <Text as="h2" size="lg" weight="bold">
        {detail.serverName}
      </Text>
      <Flicker
        size="sm"
        status={detail.isOn ? "ON" : "OFF"}
        role="alert"
        aria-label={`서버 상태: ${detail.isOn ? "ON" : "OFF"}`}
      />
    </ServerNameBox>
    <div>
      <Text as="h4" weight="bold">
        RAM 용량
      </Text>
      <Text>{detail.memorySize}MB</Text>
    </div>
    <div>
      <Text as="h4" weight="bold">
        디스크 용량
      </Text>
      <Text>{detail.diskSize}MB</Text>
    </div>
    <div>
      <Text as="h4" weight="bold">
        GPU 장치명
      </Text>
      <Text>{detail.gpuBoard.modelName}</Text>
    </div>
    <div>
      <Text as="h4" weight="bold">
        성능(TFLOPS)
      </Text>
      <Text>{detail.gpuBoard.performance}</Text>
    </div>
    <div>
      <Text as="h4" weight="bold">
        현재 실행중인 Job
      </Text>
      <Text>{getCurrentJob(detail)?.name ?? "N/A"}</Text>
    </div>
    <div>
      <Text as="h4" weight="bold">
        대기 중인 Job 개수
      </Text>
      <Text>{`${getWaitingJob(detail)?.length}개` ?? "N/A"}</Text>
    </div>
  </StyledGpuServerDetailSummary>
);

export default GpuServerDetailSummary;

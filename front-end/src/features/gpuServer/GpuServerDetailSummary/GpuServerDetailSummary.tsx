import { Flicker, Text } from "../../../components";
import {
  ServerNameBox,
  StyledGpuServerDetailSummary,
  SummaryList,
} from "./GpuServerDetailSummary.styled";
import { useAppSelector } from "../../../app/hooks";
import { selectGpuServerById } from "../gpuServerSlice";

interface GpuServerDetailSummaryProps {
  className?: string;
  serverId: number;
}

const GpuServerDetailSummary = ({ serverId, ...rest }: GpuServerDetailSummaryProps) => {
  const {
    isOn,
    serverName,
    diskSize,
    memorySize,
    modelName,
    performance,
    runningJobName,
    waitingJobCount,
  } = useAppSelector((state) => selectGpuServerById(state, serverId));

  return (
    <StyledGpuServerDetailSummary {...rest}>
      <ServerNameBox>
        <Text as="h3" size="lg" weight="bold">
          {serverName}
        </Text>
        <Flicker
          size="sm"
          status={isOn ? "ON" : "OFF"}
          role="alert"
          aria-label={`서버 상태: ${isOn ? "ON" : "OFF"}`}
        />
      </ServerNameBox>
      <SummaryList>
        <Text as="dt" weight="bold">
          RAM 용량
        </Text>
        <Text as="dd">{memorySize}MB</Text>

        <Text as="dt" weight="bold">
          디스크 용량
        </Text>
        <Text as="dd">{diskSize}MB</Text>

        <Text as="dt" weight="bold">
          GPU 장치명
        </Text>
        <Text as="dd">{modelName}</Text>

        <Text as="dt" weight="bold">
          성능(TFLOPS)
        </Text>
        <Text as="dd">{performance}</Text>

        <Text as="dt" weight="bold">
          현재 실행중인 Job
        </Text>
        <Text as="dd">{runningJobName}</Text>

        <Text as="dt" weight="bold">
          대기중인 Job 개수
        </Text>
        <Text as="dd">{waitingJobCount}개</Text>
      </SummaryList>
    </StyledGpuServerDetailSummary>
  );
};

export default GpuServerDetailSummary;

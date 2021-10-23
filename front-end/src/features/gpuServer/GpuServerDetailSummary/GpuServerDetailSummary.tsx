import { Flicker, Text } from "../../../components";
import { getCurrentJob, getWaitingJob } from "./useGpuServerDetailSummary";
import {
  ServerNameBox,
  StyledGpuServerDetailSummary,
  SummaryList,
} from "./GpuServerDetailSummary.styled";
import type { GpuServerDetail } from "../../../types";

interface GpuServerDetailSummaryProps {
  className?: string;
  labId: number;
  serverId: number;
  detail: GpuServerDetail;
}

const GpuServerDetailSummary = ({
  labId,
  serverId,
  detail,
  ...rest
}: GpuServerDetailSummaryProps) => (
  <StyledGpuServerDetailSummary {...rest}>
    <ServerNameBox>
      <Text as="h3" size="lg" weight="bold">
        {detail.serverName}
      </Text>
      <Flicker
        size="sm"
        status={detail.isOn ? "ON" : "OFF"}
        role="alert"
        aria-label={`서버 상태: ${detail.isOn ? "ON" : "OFF"}`}
      />
    </ServerNameBox>
    <SummaryList>
      <Text as="dt" weight="bold">
        RAM 용량
      </Text>
      <Text as="dd">{detail.memorySize}MB</Text>

      <Text as="dt" weight="bold">
        디스크 용량
      </Text>
      <Text as="dd">{detail.diskSize}MB</Text>

      <Text as="dt" weight="bold">
        GPU 장치명
      </Text>
      <Text as="dd">{detail.gpuBoard.modelName}</Text>

      <Text as="dt" weight="bold">
        성능(TFLOPS)
      </Text>
      <Text as="dd">{detail.gpuBoard.performance}</Text>

      <Text as="dt" weight="bold">
        현재 실행중인 Job
      </Text>
      <Text as="dd">{getCurrentJob(detail)?.name ?? "N/A"}</Text>

      <Text as="dt" weight="bold">
        대기 중인 Job 개수
      </Text>
      <Text as="dd">{`${getWaitingJob(detail)?.length}개` ?? "N/A"}</Text>
    </SummaryList>
  </StyledGpuServerDetailSummary>
);

export default GpuServerDetailSummary;

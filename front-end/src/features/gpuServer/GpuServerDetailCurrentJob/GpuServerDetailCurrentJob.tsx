import { Anchor, StyledJobDetailSummary, SummaryList } from "./GpuServerDetailCurrentJob.styled";
import { Text } from "../../../components";
import { useAppSelector } from "../../../app/hooks";
import { selectJobById } from "../../job/jobSlice";

interface GpuServerDetailCurrentJobProps {
  className?: string;
  jobId: number;
}

const GpuServerDetailCurrentJob = ({ jobId, ...rest }: GpuServerDetailCurrentJobProps) => {
  const Job = useAppSelector((state) => selectJobById(state, jobId));

  const { name, status, memberName, gpuServerName, expectedTime, dockerHubImage } = Job ?? {};

  return (
    <StyledJobDetailSummary {...rest}>
      <Text as="h3" weight="bold" size="lg">
        현재 실행중인 Job
      </Text>
      <SummaryList {...rest}>
        <Text as="dt" weight="bold">
          Job 이름
        </Text>
        <Text as="dd">{name}</Text>

        <Text as="dt" weight="bold">
          Job 상태
        </Text>
        <Text as="dd">{status}</Text>

        <Text as="dt" weight="bold">
          Job 등록자
        </Text>
        <Text as="dd">{memberName}</Text>

        <Text as="dt" weight="bold">
          할당된 서버
        </Text>
        <Text as="dd">{gpuServerName}</Text>

        <Text as="dt" weight="bold">
          실행시간(hour)
        </Text>
        <Text as="dd">{expectedTime}</Text>

        <Text as="dt" weight="bold">
          DockerHub Image
        </Text>
        <Anchor
          target="_blank"
          href={`https://hub.docker.com/r/${String(dockerHubImage)}`}
          rel="noreferrer"
        >
          {dockerHubImage}
        </Anchor>
      </SummaryList>
    </StyledJobDetailSummary>
  );
};

export default GpuServerDetailCurrentJob;

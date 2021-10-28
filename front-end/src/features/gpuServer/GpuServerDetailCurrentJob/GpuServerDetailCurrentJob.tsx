import { Anchor, StyledJobDetailSummary, SummaryList } from "./GpuServerDetailCurrentJob.styled";
import { Loading, Text } from "../../../components";
import { useAppSelector } from "../../../app/hooks";
import { selectJobById } from "../../job/jobSlice";
import { fetchGpuServerById, selectGpuServerStatus } from "../gpuServerSlice";

interface GpuServerDetailCurrentJobProps {
  className?: string;
  jobId: number;
}

const GpuServerDetailCurrentJob = ({ jobId, ...rest }: GpuServerDetailCurrentJobProps) => {
  const currentJob = useAppSelector((state) => selectJobById(state, jobId));
  const { isLoading } = useAppSelector((state) => selectGpuServerStatus(state, fetchGpuServerById));

  return (
    <StyledJobDetailSummary {...rest}>
      <Text as="h3" weight="bold" size="lg">
        현재 실행중인 Job
      </Text>
      {currentJob == null ? (
        isLoading && <Loading />
      ) : (
        <SummaryList>
          <Text as="dt" weight="bold">
            Job 이름
          </Text>
          <Text as="dd">{currentJob.name}</Text>

          <Text as="dt" weight="bold">
            Job 상태
          </Text>
          <Text as="dd">{currentJob.status}</Text>

          <Text as="dt" weight="bold">
            Job 등록자
          </Text>
          <Text as="dd">{currentJob.memberName}</Text>

          <Text as="dt" weight="bold">
            할당된 서버
          </Text>
          <Text as="dd">{currentJob.gpuServerName}</Text>

          <Text as="dt" weight="bold">
            실행시간(hour)
          </Text>
          <Text as="dd">{currentJob.expectedTime}</Text>

          <Text as="dt" weight="bold">
            DockerHub Image
          </Text>
          <Anchor
            target="_blank"
            href={`https://hub.docker.com/r/${currentJob.dockerHubImage}`}
            rel="noreferrer"
          >
            {currentJob.dockerHubImage}
          </Anchor>
        </SummaryList>
      )}
    </StyledJobDetailSummary>
  );
};

export default GpuServerDetailCurrentJob;

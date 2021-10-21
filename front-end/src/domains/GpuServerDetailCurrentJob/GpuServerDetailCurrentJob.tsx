import { GpuServerDetail } from "../../types";
import { useJobDetail } from "../JobDetail/useJobDetail";
import { StyledJobDetailSummary } from "./GpuServerDetailCurrentJob.styled";
import JobDetailSummaryContent from "../JobDetailSummaryContent/JobDetailSummaryContent";
import { Text } from "../../components";

interface GpuServerDetailCurrentJobProps {
  className?: string;
  labId: number;
  jobId: number;
  detail: GpuServerDetail;
}
const GpuServerDetailCurrentJob = ({
  labId,
  detail: gpuServerDetail,
  jobId,
  ...rest
}: GpuServerDetailCurrentJobProps) => {
  const { detail: jobDetail } = useJobDetail({ labId, jobId });
  const detailList = jobDetail
    ? [
        { title: "Job 이름", content: jobDetail.name, isLink: false },
        { title: "Job 상태", content: jobDetail.status, isLink: false },
        { title: "Job 등록자", content: jobDetail.memberName, isLink: false },
        { title: "할당된 서버", content: jobDetail.gpuServerName, isLink: false },
        { title: "실행시간(hour)", content: jobDetail.expectedTime, isLink: false },
        { title: "DockerHub Image", content: jobDetail.metaData, isLink: true },
      ]
    : [];

  return (
    <StyledJobDetailSummary {...rest}>
      <Text as="h3" weight="bold" size="lg">
        현재 실행중인 Job
      </Text>
      <JobDetailSummaryContent detailList={detailList} />
    </StyledJobDetailSummary>
  );
};

export default GpuServerDetailCurrentJob;

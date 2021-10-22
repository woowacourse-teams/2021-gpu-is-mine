import { useServerId, useGpuServerDetail } from "./useGpuServerDetail";
import {
  StyledGpuServerDetail,
  StyledGpuServerDetailCurrentJob,
  StyledGpuServerDetailSummary,
  StyledGpuServerDetailJobTable,
  NoCurrentJobCard,
  StyledNoContent,
} from "./GpuServerDetail.styled";
import { getCurrentJob } from "../GpuServerDetailSummary/useGpuServerDetailSummary";
import { Text } from "../../components";

interface GpuServerDetailProps {
  className?: string;
  labId: number;
}

const GpuServerDetail = ({ labId, ...rest }: GpuServerDetailProps) => {
  const serverId = useServerId();
  const { detail: gpuServerDetail } = useGpuServerDetail({ labId, serverId });

  const jobId = gpuServerDetail && getCurrentJob(gpuServerDetail)?.id;

  return (
    <StyledGpuServerDetail {...rest}>
      {gpuServerDetail && (
        <>
          <StyledGpuServerDetailSummary
            detail={gpuServerDetail}
            labId={labId}
            serverId={serverId}
          />
          {/* //TODO 리덕스 마이그레이션 변경  */}
          {jobId != null ? (
            <StyledGpuServerDetailCurrentJob detail={gpuServerDetail} labId={labId} jobId={jobId} />
          ) : (
            <NoCurrentJobCard>
              <Text as="h3" weight="bold" size="lg">
                현재 실행중인 Job
              </Text>
              <StyledNoContent>현재 실행 중인 Job이 없습니다</StyledNoContent>
            </NoCurrentJobCard>
          )}

          <StyledGpuServerDetailJobTable jobs={gpuServerDetail.jobs} />
        </>
      )}
    </StyledGpuServerDetail>
  );
};

export default GpuServerDetail;

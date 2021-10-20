import { useServerId, useGpuServerDetail } from "./useGpuServerDetail";
import {
  StyledGpuServerDetail,
  StyledGpuServerDetailCurrentJob,
  StyledGpuServerDetailSummary,
  StyledGpuServerDetailJobTable,
  NoCurrentJobCard,
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
          {jobId ? (
            <StyledGpuServerDetailCurrentJob detail={gpuServerDetail} labId={labId} jobId={jobId} />
          ) : (
            <NoCurrentJobCard>
              <Text size="md" color="dark">
                현재 실행 중인 Job이 없습니다
              </Text>
            </NoCurrentJobCard>
          )}
          <StyledGpuServerDetailJobTable jobs={gpuServerDetail.jobs} />
        </>
      )}
    </StyledGpuServerDetail>
  );
};

export default GpuServerDetail;

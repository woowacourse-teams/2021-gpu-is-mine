import { useServerId, useGpuServerDetail } from "./useGpuServerDetail";
import {
  StyledGpuServerDetail,
  StyledGpuServerDetailCurrentJob,
  StyledGpuServerDetailSummary,
  StyledGpuServerDetailJobTable,
} from "./GpuServerDetail.styled";
import { getCurrentJob } from "../GpuServerDetailSummary/useGpuServerDetailSummary";

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
          {jobId != null && (
            <StyledGpuServerDetailCurrentJob detail={gpuServerDetail} labId={labId} jobId={jobId} />
          )}
          <StyledGpuServerDetailJobTable jobs={gpuServerDetail.jobs} />
        </>
      )}
    </StyledGpuServerDetail>
  );
};

export default GpuServerDetail;

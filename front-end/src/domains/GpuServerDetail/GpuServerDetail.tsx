import { useServerId, useGpuServerDetail } from "./useGpuServerDetail";
import {
  StyledGpuServerDetail,
  StyledGpuServerDetailCurrentJob,
  StyledGpuServerDetailSummary,
  StyledGpuServerDetailJobTable,
} from "./GpuServerDetail.styled";

interface GpuServerDetailProps {
  className?: string;
  labId: number;
}

const GpuServerDetail = ({ labId, ...rest }: GpuServerDetailProps) => {
  const serverId = useServerId();
  const { detail: gpuServerDetail } = useGpuServerDetail({ labId, serverId });

  return (
    <StyledGpuServerDetail {...rest}>
      {gpuServerDetail && (
        <>
          <StyledGpuServerDetailSummary
            detail={gpuServerDetail}
            labId={labId}
            serverId={serverId}
          />
          <StyledGpuServerDetailCurrentJob detail={gpuServerDetail} labId={labId} />
          <StyledGpuServerDetailJobTable jobs={gpuServerDetail.jobs} />
        </>
      )}
    </StyledGpuServerDetail>
  );
};

export default GpuServerDetail;

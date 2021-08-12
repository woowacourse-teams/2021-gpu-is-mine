import { GpuServer } from "../../types";
import { getCurrentJob } from "../GpuServerDetailSummary/useGpuServerDetailSummary";
import { useJobDetail } from "../JobDetail/useJobDetail";
import JobDetailSummary from "../JobDetailSummary/JobDetailSummary";

interface GpuServerDetailCurrentJobProps {
  className?: string;
  labId: number;
  detail: GpuServer;
}
const GpuServerDetailCurrentJob = ({
  labId,
  detail: gpuServerDetail,
  ...rest
}: GpuServerDetailCurrentJobProps) => {
  const jobId = getCurrentJob(gpuServerDetail)?.id ?? -1;

  const { detail: jobDetail } = useJobDetail({ labId, jobId });

  return <div {...rest}>{jobDetail && <JobDetailSummary detail={jobDetail} />}</div>;
};

export default GpuServerDetailCurrentJob;

import { GpuServerDetail } from "../../types";
import { useJobDetail } from "../JobDetail/useJobDetail";
import JobDetailSummary from "../JobDetailSummary/JobDetailSummary";

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

  return <div {...rest}>{jobDetail && <JobDetailSummary detail={jobDetail} />}</div>;
};

export default GpuServerDetailCurrentJob;

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

  return (
    <div {...rest}>
      {jobDetail && <JobDetailSummary title="현재 실행중인 Job" detail={jobDetail} />}
    </div>
  );
};

export default GpuServerDetailCurrentJob;

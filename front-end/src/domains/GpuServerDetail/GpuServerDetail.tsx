import { useServerId } from "./useGpuServerDetail";
import GpuServerDetailSummary from "../GpuServerDetailSummary/GpuServerDetailSummary";

interface GpuServerDetailProps {
  className?: string;
  labId: number;
}

const GpuServerDetail = ({ labId, ...rest }: GpuServerDetailProps) => {
  const serverId = useServerId();

  return (
    <div {...rest}>
      <GpuServerDetailSummary labId={labId} serverId={serverId} />
    </div>
  );
};

export default GpuServerDetail;

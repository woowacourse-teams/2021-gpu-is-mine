import { useParams } from "react-router-dom";

interface GpuServerDetailProps {
  className?: string;
  labId: number;
}

export const useServerId = () => {
  const { serverId } = useParams<{ serverId?: string }>();

  if (serverId == null || serverId === "" || Number.isNaN(Number(serverId))) {
    throw Error(`Invalid serverId in params: ${String(serverId)}`);
  }

  return Number(serverId);
};

const GpuServerDetail = ({ labId, ...rest }: GpuServerDetailProps) => {
  return <div {...rest}>GpuServerDetail</div>;
};

export default GpuServerDetail;

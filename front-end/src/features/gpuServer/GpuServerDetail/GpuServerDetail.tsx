import { useEffect } from "react";
import {
  StyledGpuServerDetail,
  StyledGpuServerDetailCurrentJob,
  StyledGpuServerDetailSummary,
  StyledGpuServerDetailJobTable,
  StyledNoContent,
  NoCurrentJobCard,
} from "./GpuServerDetail.styled";
import { Loading, Text } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchGpuServerById, selectGpuServerById } from "../gpuServerSlice";

interface GpuServerDetailProps {
  serverId: number;
  className?: string;
}

const GpuServerDetail = ({ serverId, ...rest }: GpuServerDetailProps) => {
  const gpuServer = useAppSelector((state) => selectGpuServerById(state, serverId));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGpuServerById(serverId));
  }, [dispatch, serverId]);

  if (gpuServer == null) {
    return <Loading />;
  }

  const { runningJob, jobs: jobIds } = gpuServer;

  return (
    <StyledGpuServerDetail {...rest}>
      <StyledGpuServerDetailSummary serverId={serverId} />

      {runningJob ? (
        <StyledGpuServerDetailCurrentJob jobId={runningJob.id} />
      ) : (
        <NoCurrentJobCard>
          <Text as="h3" weight="bold" size="lg">
            현재 실행중인 Job
          </Text>
          <StyledNoContent>현재 실행 중인 Job이 없습니다</StyledNoContent>
        </NoCurrentJobCard>
      )}

      <StyledGpuServerDetailJobTable jobIds={jobIds} />
    </StyledGpuServerDetail>
  );
};

export default GpuServerDetail;

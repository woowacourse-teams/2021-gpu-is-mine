import { useGoToPage } from "../../hooks";
import { useJobId, useJobDetail } from "./useJobDetail";
import { Loading, Text, Dialog } from "../../components";
import {
  StyledJobDetail,
  StyledJobDetailSummary,
  StyledJobDetailGraph,
  StyledJobDetailLog,
} from "./JobDetail.styled";

interface JobDetailProps {
  className?: string;
  labId: number;
}

const JobDetail = ({ labId, ...rest }: JobDetailProps) => {
  const jobId = useJobId();

  const { done, isFailed, isLoading, isSucceed, detail, isRunning, isWaiting } = useJobDetail({
    labId,
    jobId,
  });

  const goToPreviousPage = useGoToPage(-1);

  return (
    <>
      {isLoading && <Loading size="lg" />}

      <Dialog open={isFailed} onClose={done} onConfirm={goToPreviousPage}>
        <Text>Job 상세 조회에 실패했습니다.</Text>
      </Dialog>

      {isSucceed && detail && (
        <StyledJobDetail {...rest}>
          <StyledJobDetailSummary detail={detail} />
          <StyledJobDetailGraph labId={labId} jobId={jobId} interval={isRunning || isWaiting} />
          <StyledJobDetailLog labId={labId} jobId={jobId} interval={isRunning || isWaiting} />
        </StyledJobDetail>
      )}
    </>
  );
};

export default JobDetail;

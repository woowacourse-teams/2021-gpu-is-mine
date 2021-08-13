import { useGoToPage, useJobId, useJobDetail } from "./useJobDetail";
import { Loading, Text, Alert } from "../../components";
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

  const { detail, status, isRunning, isWaiting } = useJobDetail({ labId, jobId });

  const goToPreviousPage = useGoToPage(-1);

  return (
    <>
      {status === "loading" && <Loading size="lg" />}
      {status === "failed" && (
        <Alert onConfirm={goToPreviousPage}>
          <Text>Job 상세 조회에 실패했습니다.</Text>
        </Alert>
      )}
      {status === "succeed" && detail && (
        <StyledJobDetail {...rest}>
          <StyledJobDetailSummary detail={detail} />
          <StyledJobDetailGraph labId={labId} jobId={jobId} interval={isRunning || isWaiting } />
          <StyledJobDetailLog labId={labId} jobId={jobId} interval={isRunning || isWaiting} />
        </StyledJobDetail>
      )}
    </>
  );
};

export default JobDetail;

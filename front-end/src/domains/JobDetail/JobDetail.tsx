import { useEffect } from "react";
import { useGoToPage } from "../../hooks";
import { useJobId } from "./useJobDetail";
import { Loading, Text, Dialog } from "../../components";
import {
  StyledJobDetail,
  StyledJobDetailSummary,
  StyledJobDetailGraph,
  StyledJobDetailLog,
} from "./JobDetail.styled";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getJobById,
  resetJobActionState,
  selectJobActionState,
  selectJobById,
} from "../../features/job/jobSlice";

interface JobDetailProps {
  className?: string;
  labId: number;
}

const JobDetail = ({ labId, ...rest }: JobDetailProps) => {
  const jobId = useJobId();

  const appDispatch = useAppDispatch();

  const detail = useAppSelector(selectJobById(jobId));

  const { isLoading, isFailed, isSucceed, error } = useAppSelector(
    selectJobActionState(getJobById)
  );

  const isRunning = detail?.status === "RUNNING";
  const isWaiting = detail?.status === "WAITING";

  const goToPreviousPage = useGoToPage(-1);

  const done = () => {
    appDispatch(resetJobActionState(getJobById.typePrefix));
  };

  useEffect(() => {
    appDispatch(getJobById({ jobId }));
  }, [appDispatch, jobId]);

  return (
    <>
      {isLoading && <Loading size="lg" />}

      <Dialog open={isFailed} onClose={done} onConfirm={goToPreviousPage}>
        <Text>존재 하지 않은 Job입니다. {error?.message}</Text>
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

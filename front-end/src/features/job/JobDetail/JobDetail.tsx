import { useEffect } from "react";
import {
  selectJobActionState,
  selectJobById,
  fetchJobById,
  resetJobActionState,
} from "../jobSlice";
import { selectMyInfo } from "../../member/authSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useGoToPage, useJobId } from "../../../hooks";
import { Loading, Text, Dialog } from "../../../components";
import {
  StyledJobDetail,
  StyledJobDetailSummary,
  StyledJobDetailGraph,
  StyledJobDetailLog,
} from "./JobDetail.styled";
import type { RootState } from "../../../app/store";

interface JobDetailProps {
  className?: string;
}

const JobDetail = ({ ...rest }: JobDetailProps) => {
  const jobId = useJobId();

  const { labId } = useAppSelector(selectMyInfo);

  const detail = useAppSelector((state: RootState) => selectJobById(state, jobId));

  const { isLoading, isFailed, error } = useAppSelector((state: RootState) =>
    selectJobActionState(state, fetchJobById)
  );

  const dispatch = useAppDispatch();

  const isRunning = detail?.status === "RUNNING";
  const isWaiting = detail?.status === "WAITING";

  const goToPreviousPage = useGoToPage(-1);

  const done = () => {
    dispatch(resetJobActionState(fetchJobById));
  };

  useEffect(() => {
    dispatch(fetchJobById({ jobId }));
  }, [dispatch, jobId]);

  return (
    <>
      {isLoading && <Loading size="lg" />}

      <Dialog open={isFailed} onClose={done} onConfirm={goToPreviousPage}>
        <Text>{error?.message}</Text>
      </Dialog>

      {detail && (
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

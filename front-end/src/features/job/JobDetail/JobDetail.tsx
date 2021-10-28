import { useEffect } from "react";
import { useGoToPage } from "../../../hooks";
import { useJobId } from "./useJobDetail";
import { Loading, Text, Dialog } from "../../../components";
import {
  StyledJobDetail,
  StyledJobDetailSummary,
  StyledJobDetailGraph,
  StyledJobDetailLog,
} from "./JobDetail.styled";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectJobActionState,
  selectJobById,
  fetchJobById,
  resetJobActionState,
} from "../jobSlice";
import { RootState } from "../../../app/store";
import { selectMyInfo } from "../../member/authSlice";

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

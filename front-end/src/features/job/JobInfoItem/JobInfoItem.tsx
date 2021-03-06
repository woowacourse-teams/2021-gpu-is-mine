import { PATH } from "../../../constants";
import { cancelJobById, selectJobActionState } from "../jobSlice";
import { useBoolean, useMoveToPage } from "../../../hooks";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Button, CalendarIcon, Dialog, Text, useToast, VerticalBox } from "../../../components";
import { StyledJobInfoItem } from "./JobInfoItem.styled";
import type { Job, RequiredSerializedError } from "../jobSlice";
import type { RootState } from "../../../app/store";
import type { JobStatus } from "../../../types";
import { selectMyInfo } from "../../member/authSlice";

interface JobInfoItemProps extends Job {
  className?: string;
}

const statusName: Record<JobStatus, string> = {
  WAITING: "대기중",
  RUNNING: "진행중",
  COMPLETED: "완료됨",
  CANCELED: "취소됨",
  FAILED: "실패함",
} as const;

const startTimeLabel: Record<JobStatus, string> = {
  WAITING: "예상 시작 시간",
  RUNNING: "시작 시간",
  COMPLETED: "시작 시간",
  CANCELED: "예상 시작 시간",
  FAILED: "시작 시간",
} as const;

const endTimeLabel: Record<JobStatus, string> = {
  WAITING: "예상 완료 시간",
  RUNNING: "예상 완료 시간",
  COMPLETED: "완료 시간",
  CANCELED: "취소 시간",
  FAILED: "실패 시간",
} as const;

const JobInfoItem = ({
  id: jobId,
  name: jobName,
  status: jobStatus,
  gpuServerName,
  memberName,
  startTime,
  endTime,
  memberId,
  ...rest
}: JobInfoItemProps) => {
  const appDispatch = useAppDispatch();

  const showToast = useToast();

  const { isLoading } = useAppSelector((state: RootState) =>
    selectJobActionState(state, cancelJobById)
  );

  const { memberId: myId, memberType } = useAppSelector(selectMyInfo);

  const [isConfirmOpen, openConfirm, closeConfirm] = useBoolean(false);

  const onConfirm = async () => {
    try {
      await appDispatch(cancelJobById({ jobId, jobMemberId: memberId })).unwrap();
      showToast({
        type: "success",
        title: "Job 취소 성공",
        message: `${jobName}이(가) 취소되었습니다.`,
      });
    } catch (err) {
      const error = err as RequiredSerializedError;

      showToast({
        type: "error",
        title: error.name,
        message: error.message,
      });
    } finally {
      closeConfirm();
    }
  };

  const handleDetailClick = useMoveToPage(`${PATH.JOB.VIEW}/${jobId}`);

  const details = [
    { label: "할당 서버", content: gpuServerName },
    { label: "예약자", content: memberName },
    { label: startTimeLabel[jobStatus], content: startTime },
    { label: endTimeLabel[jobStatus], content: endTime },
  ];

  const isCancelable =
    (jobStatus === "WAITING" && memberId === myId) ||
    (jobStatus === "WAITING" && memberType === "MANAGER");

  return (
    <>
      <Dialog
        open={isConfirmOpen}
        onClose={closeConfirm}
        onConfirm={onConfirm}
        onCancel={closeConfirm}
      >
        <Text size="sm" weight="medium">
          {jobName}을(를) 취소하시겠습니까?
        </Text>
      </Dialog>

      <StyledJobInfoItem {...rest}>
        <div className="job-info-title-wrapper">
          <VerticalBox>
            <CalendarIcon className="job-info-title-wrapper__status" size="md" status={jobStatus} />
            <Text size="xs">{statusName[jobStatus]}</Text>
          </VerticalBox>
          <Text className="job-info-title-wrapper__title" size="sm" weight="bold">
            {jobName}
          </Text>
        </div>
        <div className="job-info-details-wrapper">
          {details.map(({ label, content }) => (
            <div className="job-info-details-wrapper__detail-col" key={label}>
              <Text size="sm" weight="bold">
                {label}
              </Text>
              <Text size="sm" weight="medium" className="job-info-details-wrapper__text">
                {content || "-"}
              </Text>
            </div>
          ))}
        </div>
        <div className="job-info-button-wrapper">
          <Button
            className="job-info-button-wrapper__button"
            color="primary"
            onClick={handleDetailClick}
          >
            상세
          </Button>
          <Button
            className="job-info-button-wrapper__button"
            color="error"
            disabled={!isCancelable || isLoading}
            onClick={openConfirm}
          >
            취소
          </Button>
        </div>
      </StyledJobInfoItem>
    </>
  );
};

export default JobInfoItem;

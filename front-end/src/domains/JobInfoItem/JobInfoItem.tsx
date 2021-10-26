import { formatDate } from "../../utils";
import { useBoolean, useCancelJob, useMoveToPage } from "../../hooks";
import { Button, CalendarIcon, Dialog, Text, VerticalBox } from "../../components";
import { StyledJobInfoItem } from "./JobInfoItem.styled";
import { PATH } from "../../constants";
import { JobViewResponse } from "../../types";

interface JobInfoItemProps extends JobViewResponse {
  labId: number;
  refresh: () => Promise<unknown>;
}

const statusName = {
  WAITING: "대기중",
  RUNNING: "진행중",
  COMPLETED: "완료됨",
  CANCELED: "취소됨",
} as const;

const startTimeLabel = {
  WAITING: "시작 시간",
  RUNNING: "시작 시간",
  COMPLETED: "시작 시간",
  CANCELED: "시작 시간",
} as const;

const endTimeLabel = {
  WAITING: "완료 시간",
  RUNNING: "완료 시간",
  COMPLETED: "완료 시간",
  CANCELED: "완료 시간", // TODO: 취소 시간으로 바꾸기
} as const;

const JobInfoItem = ({
  id: jobId,
  labId,
  name: jobName,
  status: jobStatus,
  gpuServerName,
  memberName,
  calculatedTime: { createdTime, startedTime, completedTime },
  refresh,
}: JobInfoItemProps) => {
  const {
    isSucceed,
    isFailed,
    status,
    makeRequest: cancelJob,
    done,
  } = useCancelJob({ labId, jobId });

  const [isConfirmOpen, openConfirm, closeConfirm] = useBoolean(false);

  const handleDetailClick = useMoveToPage(`${PATH.JOB.VIEW}/${jobId}`);

  const startTime = startedTime ?? createdTime;
  const formattedStartTime = startTime ? formatDate(new Date(startTime)) : "-";

  const endTime = completedTime;
  const formattedEndTime = endTime ? formatDate(new Date(endTime)) : "-";

  const details = [
    { label: "할당 서버", content: gpuServerName },
    { label: startTimeLabel[jobStatus], content: formattedStartTime },
    { label: endTimeLabel[jobStatus], content: formattedEndTime },
    { label: "예약자", content: memberName },
  ];

  const isCancelable = jobStatus === "WAITING";

  return (
    <>
      <Dialog open={isSucceed} onClose={done} onConfirm={refresh}>
        <Text size="md" weight="regular">
          {jobName}이(가) 취소되었습니다.
        </Text>
      </Dialog>

      <Dialog open={isFailed} onClose={done} onConfirm={done}>
        <Text size="md" weight="regular">
          {jobName} 취소에 실패하였습니다.
        </Text>
      </Dialog>

      <Dialog
        open={isConfirmOpen}
        onClose={closeConfirm}
        onConfirm={() => {
          cancelJob();
          closeConfirm();
        }}
        onCancel={closeConfirm}
      >
        <Text size="sm" weight="medium">
          {jobName}을(를) 취소하시겠습니까?
        </Text>
      </Dialog>

      <StyledJobInfoItem>
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
                {content || "N/A"}
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
            disabled={!isCancelable || status === "loading"}
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

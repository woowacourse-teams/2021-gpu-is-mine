import { formatDate } from "../../utils";
import { useBoolean, useCancelJob, useMoveToPage } from "../../hooks";
import { Alert, Button, CalendarIcon, Confirm, Text, VerticalBox } from "../../components";
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
  WAITING: "예상 시작 시간",
  RUNNING: "시작 시간",
  COMPLETED: "시작 시간",
  CANCELED: "예상 시작 시간",
} as const;

const endTimeLabel = {
  WAITING: "예상 완료 시간",
  RUNNING: "예상 완료 시간",
  COMPLETED: "완료 시간",
  CANCELED: "취소 시간",
} as const;

const JobInfoItem = ({
  id: jobId,
  labId,
  name: jobName,
  status: jobStatus,
  gpuServerName,
  memberName,
  calculatedTime: { expectedStartedTime, startedTime, completedTime, expectedCompletedTime },
  refresh,
}: JobInfoItemProps) => {
  const { status, makeRequest: cancelJob, done } = useCancelJob({ labId, jobId });

  const [isConfirmOpen, openConfirm, closeConfirm] = useBoolean(false);

  const handleDetailClick = useMoveToPage(`${PATH.JOB.VIEW}/${jobId}`);

  const startTime = startedTime || expectedStartedTime;
  const formattedStartTime = startTime && formatDate(new Date(startTime));

  const endTime = completedTime || expectedCompletedTime;
  const formattedEndTime = endTime && formatDate(new Date(endTime));

  const details = [
    { label: "할당 서버", content: gpuServerName },
    { label: startTimeLabel[jobStatus], content: formattedStartTime },
    { label: endTimeLabel[jobStatus], content: formattedEndTime },
    { label: "예약자", content: memberName },
  ];

  const isCancelable = jobStatus === "WAITING";

  return (
    <>
      {status === "succeed" && (
        <Alert onConfirm={refresh}>
          <Text size="md" weight="regular">
            {`${jobName}이(가) 취소되었습니다.`}
          </Text>
        </Alert>
      )}

      {status === "failed" && (
        <Alert onConfirm={done}>
          <Text size="md" weight="regular">
            {`${jobName} 취소에 실패하였습니다.`}
          </Text>
        </Alert>
      )}

      <Confirm isOpen={isConfirmOpen} close={closeConfirm} onConfirm={() => cancelJob()}>
        <Text size="md" weight="regular">
          {jobName}을(를) 정말 취소하시겠습니까?
        </Text>
      </Confirm>

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

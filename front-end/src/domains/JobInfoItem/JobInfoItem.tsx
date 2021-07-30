import { useHistory } from "react-router-dom";
import { formatDate, addHours } from "../../utils";
import { useBoolean, useAuth, usePutJobDetail } from "../../hooks";
import { Alert, Button, CalendarIcon, Confirm, Text, VerticalBox } from "../../components";
import { StyledJobInfoItem } from "./JobInfoItem.styled";
import { PATH } from "../../constants";
import { JobViewResponse, MyInfoResponse } from "../../types";

interface JobInfoItemProps extends JobViewResponse {
  refresh: () => Promise<unknown>;
}

const JobInfoItem = ({
  id: jobId,
  name: jobName,
  status: jobStatus,
  gpuServerName,
  memberName,
  refresh,
}: JobInfoItemProps) => {
  // TODO: 실제 예상 시간으로 교체
  // TODO: 서버별 job의 현재 실행 중인 job의 예상 종료 시간 + 나머지 jobs들의 expected time을 전부 더함

  const history = useHistory();

  const { myInfo } = useAuth() as { myInfo: MyInfoResponse };

  const { status, makeRequest, done } = usePutJobDetail({ labId: myInfo.labResponse.id, jobId });

  const [isConfirmOpen, openConfirm, closeConfirm] = useBoolean(false);

  const handleDetailClick = () => {
    history.push(`${PATH.MANAGER.JOB.VIEW}/${jobId}`);
  };

  const startTime = formatDate(new Date());
  const endTime = formatDate(addHours(new Date(), Math.floor(Math.random() * 100)));

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

      <Confirm isOpen={isConfirmOpen} close={closeConfirm} onConfirm={() => makeRequest()}>
        <Text size="md" weight="regular">
          {jobName}을(를) 정말 취소하시겠습니까?
        </Text>
      </Confirm>

      <StyledJobInfoItem>
        <div className="job-info-title-wrapper">
          <VerticalBox>
            <CalendarIcon className="job-info-title-wrapper__status" size="md" status={jobStatus} />
            <Text size="xs">작업중</Text>
          </VerticalBox>
          <Text className="job-info-title-wrapper__title" size="sm" weight="bold">
            {jobName}
          </Text>
        </div>
        <div className="job-info-details-wrapper">
          <div className="job-info-details-wrapper__detail-col">
            <Text size="sm" weight="bold">
              할당 서버
            </Text>
            <Text size="sm" weight="medium" className="job-info-details-wrapper__text">
              {gpuServerName}
            </Text>
          </div>
          <div className="job-info-details-wrapper__detail-col">
            <Text size="sm" weight="bold">
              (예상) 시작 시간
            </Text>
            <Text size="sm" weight="medium">
              {startTime}
            </Text>
          </div>
          <div className="job-info-details-wrapper__detail-col">
            <Text size="sm" weight="bold">
              (예상) 완료 시간
            </Text>
            <Text size="sm" weight="medium">
              {endTime}
            </Text>
          </div>
          <div className="job-info-details-wrapper__detail-col">
            <Text size="sm" weight="bold">
              예약자
            </Text>
            <Text size="sm" weight="medium" className="job-info-details-wrapper__text">
              {memberName}
            </Text>
          </div>
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
            disabled={jobStatus === "CANCELED" || jobStatus === "COMPLETED" || status === "loading"}
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

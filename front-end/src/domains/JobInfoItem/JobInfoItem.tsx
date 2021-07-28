import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useBoolean, useFetch } from "../../hooks";
import { formatDate, addHours } from "../../utils";
import { Alert, Button, CalendarIcon, Confirm, Text } from "../../components";
import { StyledJobInfoItem } from "./JobInfoItem.styled";
import { API_ENDPOINT, PATH } from "../../constants";
import { JobViewResponse } from "../../types";

interface JobInfoItemProps extends JobViewResponse {
  refresh: () => Promise<unknown | AxiosError<unknown>>;
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
  // TODO: jobs의 순서 (우선순위)는 index인지 확인 필요
  const startTime = formatDate(new Date());
  const endTime = formatDate(addHours(new Date(), Math.floor(Math.random() * 100)));

  const history = useHistory();

  const { status, makeRequest, done } = useFetch<void>(`${API_ENDPOINT.LABS(1).JOBS}/${jobId}`, {
    method: "put",
  });

  const [isConfirmOpen, openConfirm, closeConfirm] = useBoolean(false);

  const alertMessage: { [key in "succeed" | "failed"]: string } = {
    succeed: `${jobName}이(가) 취소되었습니다.`,
    failed: `${jobName} 취소에 실패하였습니다.`,
  };

  const handleAlertConfirm = async () => {
    if (status === "succeed") {
      await refresh();
    }

    done();
  };

  return (
    <>
      {(status === "succeed" || status === "failed") && (
        <Alert onConfirm={handleAlertConfirm}>
          <Text size="md" weight="regular">
            {alertMessage[status] ?? ""}
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
          <CalendarIcon className="job-info-title-wrapper__status" size="md" status={jobStatus} />
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
              {/** TFLOPS 를 적으려 했지만, 응답에 데이터 X */}
              {/** 방법1. BE에 응답 추가해달라고 요청 */}
              {/** 방법2. 최초 GPU 서버 데이터 요청 및 전역 공간에 저장 */}
              {gpuServerName}
            </Text>
          </div>
          <div className="job-info-details-wrapper__detail-col">
            <Text size="sm" weight="bold">
              {"(예상) 시작 시간"}
            </Text>
            <Text size="sm" weight="medium">
              {startTime}
            </Text>
          </div>
          <div className="job-info-details-wrapper__detail-col">
            <Text size="sm" weight="bold">
              {"(예상) 완료 시간"}
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
          {jobStatus === "COMPLETED" ? (
            <Button
              className="job-info-button-wrapper__button"
              color="primary"
              onClick={() => history.push(`${PATH.MANAGER.JOB.VIEW}/${jobId}`)}
            >
              상세
            </Button>
          ) : (
            <Button
              className="job-info-button-wrapper__button"
              color="error"
              disabled={jobStatus === "CANCELED" || status === "loading"}
              onClick={openConfirm}
            >
              취소
            </Button>
          )}
        </div>
      </StyledJobInfoItem>
    </>
  );
};

export default JobInfoItem;

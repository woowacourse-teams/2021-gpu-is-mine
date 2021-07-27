import { Button, CalendarIcon, Text } from "../../components";
import { JobViewResponse } from "../../types";
import { formatDate, addHours } from "../../utils";
import { StyledJobInfoItem } from "./JobInfoItem.styled";

interface JobInfoItemProps extends JobViewResponse {}

const JobInfoItem = ({
  name: jobName,
  status: jobStatus,
  gpuServerName,
  memberName,
}: JobInfoItemProps) => {
  // TODO: 실제 예상 시간으로 교체
  // TODO: 서버별 job의 현재 실행 중인 job의 예상 종료 시간 + 나머지 jobs들의 expected time을 전부 더함
  const startTime = formatDate(new Date());
  const endTime = formatDate(addHours(new Date(), Math.floor(Math.random() * 100)));

  return (
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
          <Button className="job-info-button-wrapper__button" color="primary">
            상세
          </Button>
        ) : (
          <Button
            className="job-info-button-wrapper__button"
            color="error"
            disabled={jobStatus === "CANCELED"}
          >
            취소
          </Button>
        )}
      </div>
    </StyledJobInfoItem>
  );
};

export default JobInfoItem;

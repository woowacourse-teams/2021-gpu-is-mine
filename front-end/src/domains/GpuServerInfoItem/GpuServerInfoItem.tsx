import { Flicker, Text, VerticalBox, ServerIcon, Button } from "../../components";
import { ServerOffMark, StyledGpuServerInfoItem } from "./GpuServerInfoItem.styled";

// TODO : 논의해볼 것
/**
 * Props => 내부에서 처리하도록 or 처리된 값만 받도록
 * JobStatus / JobInfo와 같은 type의 위치
 * 서버 정보와 관련된 contents object로 만들어 map으로 적용 여부?
 *
 * 반응형 대응시 mobile & desktop 버젼을 따로 만들어야할지?
 * 스타일 관련
 */

type JobStatus = "WAITING" | "COMPLETED" | "CANCELED" | "RUNNING";
interface JobInfo {
  name: string;
  status: JobStatus;
}
interface GpuServerInfoItemProps {
  name: string;
  isServerOn: boolean;
  isBoardWorking: boolean;
  performance: number;
  jobs: JobInfo[];
}

const GpuServerInfoItem = ({ name, isServerOn, performance, jobs }: GpuServerInfoItemProps) => {
  const displayServerStatusMark = (isServerOn: boolean) => {
    return isServerOn ? <Flicker status="ON" size="sm" /> : <ServerOffMark />;
  };

  const currentJobName = jobs.find((job) => job.status === "RUNNING")?.name ?? "N/A";
  const waitingJobCount = jobs.filter((job) => job.status === "WAITING").length;

  return (
    <StyledGpuServerInfoItem>
      <div className="gpu-server-title-wrapper">
        <ServerIcon />
        <Text size="md" weight="bold">
          {name}
        </Text>
        {displayServerStatusMark(isServerOn)}
      </div>
      <VerticalBox className="gpu-server-details">
        <div className="detail-wrapper">
          <Text size="sm" weight="medium">
            GPU 연산량
          </Text>
          <Text size="sm" weight="bold">
            {performance} TFLOPS
          </Text>
        </div>
        <div className="detail-wrapper">
          <Text size="sm" weight="medium">
            현재 실행중인 Job
          </Text>
          <Text size="sm" weight="bold">
            {currentJobName}
          </Text>
        </div>
        <div className="detail-wrapper">
          <Text size="sm" weight="medium">
            대기 중인 Job 개수
          </Text>
          <Text size="sm" weight="bold">
            {waitingJobCount}개
          </Text>
        </div>
      </VerticalBox>
      <div className="button-wrapper">
        <Button color="primary-dark">수정</Button>
        <Button color="primary">삭제</Button>
      </div>
    </StyledGpuServerInfoItem>
  );
};

export default GpuServerInfoItem;

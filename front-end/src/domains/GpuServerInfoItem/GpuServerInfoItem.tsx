import { Flicker, Text, VerticalBox, ServerIcon, Button } from "../../components";
import { ServerOffMark, StyledGpuServerInfoItem } from "./GpuServerInfoItem.styled";

type JobStatus = "WAITING" | "COMPLETED" | "CANCELED" | "RUNNING";
interface JobInfo {
  name: string;
  status: JobStatus;
}
interface GpuServerInfoItemProps {
  name: string;
  isServerOn: boolean;
  // 현재사용되지 않지만, Response에 포함되는 항목임
  // isBoardWorking: boolean;
  performance: number;
  jobs: JobInfo[];
}

const GpuServerInfoItem = ({ name, isServerOn, performance, jobs }: GpuServerInfoItemProps) => {
  const currentJobName = jobs.find((job) => job.status === "RUNNING")?.name ?? "N/A";
  const waitingJobCount = jobs.filter((job) => job.status === "WAITING").length;

  return (
    <StyledGpuServerInfoItem>
      <div className="gpu-server-title-wrapper">
        <ServerIcon className="gpu-server-icon" />
        <Text className="gpu-server-title" size="md" weight="bold">
          {name}
        </Text>
        {isServerOn ? (
          <Flicker className="status-mark" status="ON" size="sm" />
        ) : (
          <ServerOffMark className="status-mark" />
        )}
      </div>
      <VerticalBox className="gpu-server-details-wrapper">
        <div className="detail">
          <Text size="sm" weight="bold">
            GPU 연산량
          </Text>
          <Text size="sm" weight="medium">
            {performance} TFLOPS
          </Text>
        </div>
        <div className="detail">
          <Text size="sm" weight="bold">
            현재 실행중인 Job
          </Text>
          <Text size="sm" weight="medium">
            {currentJobName}
          </Text>
        </div>
        <div className="detail">
          <Text size="sm" weight="bold">
            대기 중인 Job 개수
          </Text>
          <Text size="sm" weight="medium">
            {waitingJobCount}개
          </Text>
        </div>
      </VerticalBox>
      <div className="button-wrapper">
        <Button className="button" color="primary-dark">
          수정
        </Button>
        <Button className="button" color="primary">
          삭제
        </Button>
      </div>
    </StyledGpuServerInfoItem>
  );
};

export default GpuServerInfoItem;

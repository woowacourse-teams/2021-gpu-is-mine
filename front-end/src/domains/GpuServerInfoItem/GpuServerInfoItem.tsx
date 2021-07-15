import { Flicker, Text, VerticalBox, ServerIcon, Button } from "../../components";
import { GpuServerViewResponse } from "../../types/gpuServer";
import { ServerOffMark, StyledGpuServerInfoItem } from "./GpuServerInfoItem.styled";

const GpuServerInfoItem = ({
  serverName,
  isOn,
  gpuBoard: { performance },
  jobs,
}: GpuServerViewResponse["gpus"][number]) => {
  const currentJobName = jobs.find((job) => job.status === "RUNNING")?.name ?? "N/A";
  const waitingJobCount = jobs.filter((job) => job.status === "WAITING").length;

  return (
    <StyledGpuServerInfoItem>
      <div className="gpu-server-title-wrapper">
        <ServerIcon className="gpu-server-icon" />
        <Text className="gpu-server-title" size="md" weight="bold">
          {serverName}
        </Text>
        {isOn ? (
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

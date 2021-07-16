import { Flicker, Text, VerticalBox, ServerIcon, Button } from "../../components";
import useFetch from "../../hooks/useFetch/useFetch";
import { GpuServerViewResponse } from "../../types/gpuServer";
import { ServerOffMark, StyledGpuServerInfoItem } from "./GpuServerInfoItem.styled";

interface GpuServerInfoItemProps extends GpuServerViewResponse {
  onDelete: () => void;
}

const GpuServerInfoItem = ({
  id,
  serverName,
  isOn,
  gpuBoard: { performance },
  jobs,
  onDelete,
}: GpuServerInfoItemProps) => {
  const currentJobName = jobs.find((job) => job.status === "RUNNING")?.name ?? "N/A";
  const waitingJobCount = jobs.filter((job) => job.status === "WAITING").length;

  const { makeRequest, done } = useFetch<void>(`http://3.35.169.99:8080/api/labs/1/gpus/${id}`, {
    method: "delete",
  });

  const handleDelete = () => {
    makeRequest()
      .then(() => {
        alert("삭제에 성공하였습니다.");
        done();
        onDelete();
      })
      .catch(() => alert("삭제에 실패하였습니다. 다시 시도해주세요. "));
  };

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
        <Button className="button" color="primary" onClick={handleDelete}>
          삭제
        </Button>
      </div>
    </StyledGpuServerInfoItem>
  );
};

export default GpuServerInfoItem;

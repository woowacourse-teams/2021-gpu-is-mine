import { AxiosError } from "axios";
import { useBoolean, useDeleteGpuServer } from "../../hooks";
import {
  Flicker,
  Text,
  VerticalBox,
  ServerIcon,
  Button,
  Confirm,
  Alert,
  Loading,
  Dimmer,
} from "../../components";
import { StyledGpuServerInfoItem } from "./GpuServerInfoItem.styled";
import { GpuServerViewResponse } from "../../types";

interface GpuServerInfoItemProps extends GpuServerViewResponse {
  refresh: () => Promise<unknown | AxiosError<unknown>>;
}

const GpuServerInfoItem = ({
  id,
  serverName,
  isOn,
  gpuBoard: { performance },
  jobs,
  refresh,
}: GpuServerInfoItemProps) => {
  const currentJobName = jobs.find((job) => job.status === "RUNNING")?.name ?? "N/A";
  const waitingJobCount = jobs.filter((job) => job.status === "WAITING").length;

  const { makeRequest, done, isLoading, isSucceed, isFailed } = useDeleteGpuServer({
    labId: 1,
    serverId: id,
  });

  const [isConfirmOpen, openConfirm, closeConfirm] = useBoolean(false);

  return (
    <>
      {isLoading && (
        <Dimmer>
          <Loading size="lg" />
        </Dimmer>
      )}

      {isSucceed && (
        <Alert onConfirm={refresh}>
          <Text size="md" weight="regular">
            {`${serverName}을(를) 삭제하였습니다.`}
          </Text>
        </Alert>
      )}

      {isFailed && (
        <Alert onConfirm={done}>
          <Text size="md" weight="regular">
            {`${serverName} 삭제에 실패하였습니다.`}
          </Text>
        </Alert>
      )}

      <Confirm isOpen={isConfirmOpen} close={closeConfirm} onConfirm={() => makeRequest()}>
        <Text size="md" weight="regular">
          {serverName}을(를) 정말 삭제하시겠습니까?
        </Text>
      </Confirm>

      <StyledGpuServerInfoItem>
        <div className="gpu-server-title-wrapper">
          <ServerIcon className="gpu-server-icon" />
          <Text className="gpu-server-title" size="md" weight="bold">
            {serverName}
          </Text>
          <Flicker className="status-mark" status={isOn ? "ON" : "OFF"} size="sm" />
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
          <Button className="button" color="primary" disabled={isLoading} onClick={openConfirm}>
            삭제
          </Button>
        </div>
      </StyledGpuServerInfoItem>
    </>
  );
};

export default GpuServerInfoItem;

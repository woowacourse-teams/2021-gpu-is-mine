import { useState } from "react";
import { AxiosError } from "axios";
import { Flicker, Text, VerticalBox, ServerIcon, Button, Confirm, Alert } from "../../components";
import { useBoolean, useFetch } from "../../hooks";
import { ServerOffMark, StyledGpuServerInfoItem } from "./GpuServerInfoItem.styled";
import { API_ENDPOINT } from "../../constants";
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

  const { status, makeRequest, done } = useFetch<void>(`${API_ENDPOINT.LABS(1).GPUS}/${id}`, {
    method: "delete",
  });

  const [isConfirmOpen, openConfirm, closeConfirm] = useBoolean(false);
  const [alertMessage, setAlertMessage] = useState("");
  const isAlertOpen = ["succeed", "failed"].includes(status);

  const deleteServer = async () => {
    try {
      await makeRequest();

      setAlertMessage("삭제 성공");
    } catch {
      setAlertMessage("삭제에 실패하였습니다.");
    }
  };

  const handleAlertConfirm = async () => {
    if (status === "succeed") {
      await refresh();
    }

    done();
  };

  return (
    <StyledGpuServerInfoItem>
      <Confirm isOpen={isConfirmOpen} close={closeConfirm} onConfirm={deleteServer}>
        정말 삭제하시겠습니까?
      </Confirm>

      <Alert isOpen={isAlertOpen} onConfirm={handleAlertConfirm}>
        {alertMessage}
      </Alert>

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
        <Button
          className="button"
          color="primary"
          disabled={status === "loading"}
          onClick={openConfirm}
        >
          삭제
        </Button>
      </div>
    </StyledGpuServerInfoItem>
  );
};

export default GpuServerInfoItem;

import { useBoolean, useDeleteGpuServer, useMoveToPage } from "../../hooks";
import { Flicker, Text, VerticalBox, ServerIcon, Button, Loading, Dimmer } from "../../components";
import { StyledGpuServerInfoItem } from "./GpuServerInfoItem.styled";
import { SimpleGpuServer, MemberType } from "../../types";
import { PATH } from "../../constants";
import Dialog from "../../components/Dialog/Dialog";

interface GpuServerInfoItemProps extends SimpleGpuServer {
  memberType: MemberType;
  labId: number;
  refresh: () => Promise<unknown>;
  className?: string;
}

const GpuServerInfoItem = ({
  id: serverId,
  serverName,
  isOn,
  gpuBoard: { performance },
  runningJobs,
  labId,
  memberType,
  waitingJobCount,
  refresh,
  className,
}: GpuServerInfoItemProps) => {
  const runningJobName = runningJobs[0]?.name || "N/A";

  const { makeRequest, done, isLoading, isSucceed, isFailed } = useDeleteGpuServer({
    labId,
    serverId,
  });

  const handleDetailClick = useMoveToPage(`${PATH.GPU_SERVER.VIEW}/${serverId}`);

  const [isConfirmOpen, openConfirm, closeConfirm] = useBoolean(false);

  const handleConfirmConfirmed = () => {
    makeRequest();
    closeConfirm();
  };

  return (
    <>
      {isLoading && (
        <Dimmer>
          <Loading size="lg" />
        </Dimmer>
      )}

      <Dialog open={isSucceed} onClose={done} onConfirm={refresh}>
        <Text size="sm" weight="medium">
          {`${serverName}을(를) 삭제하였습니다.`}
        </Text>
      </Dialog>

      <Dialog open={isFailed} onClose={done} onConfirm={done}>
        <Text size="sm" weight="medium">
          {
            /* TODO: 에러에 따라 구체적인 디렉션 추가 */
            `${serverName} 삭제에 실패하였습니다.`
          }
        </Text>
      </Dialog>

      <Dialog
        open={isConfirmOpen}
        onClose={closeConfirm}
        onConfirm={handleConfirmConfirmed}
        onCancel={closeConfirm}
      >
        <Text size="sm" weight="medium">
          {serverName}을(를) 삭제하시겠습니까?
        </Text>
      </Dialog>

      <StyledGpuServerInfoItem className={className}>
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
              {runningJobName}
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
          <Button className="button" color="primary" onClick={handleDetailClick}>
            상세
          </Button>

          {memberType === "MANAGER" && (
            <Button className="button" color="error" disabled={isLoading} onClick={openConfirm}>
              삭제
            </Button>
          )}
        </div>
      </StyledGpuServerInfoItem>
    </>
  );
};

export default GpuServerInfoItem;

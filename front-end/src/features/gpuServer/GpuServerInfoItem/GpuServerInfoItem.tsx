import type { SerializedError } from "@reduxjs/toolkit";
import { PATH } from "../../../constants";
import { selectGpuServerById, selectGpuServerStatus, deleteGpuServerById } from "../gpuServerSlice";
import { selectMemberType } from "../../member/authSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useBoolean, useMoveToPage } from "../../../hooks";
import {
  Flicker,
  Text,
  VerticalBox,
  ServerIcon,
  Button,
  Dialog,
  useToast,
} from "../../../components";
import { StyledGpuServerInfoItem } from "./GpuServerInfoItem.styled";
import type { RootState } from "../../../app/store";

interface GpuServerInfoItemProps {
  className?: string;
  serverId: number;
}

const GpuServerInfoItem = ({ serverId, className }: GpuServerInfoItemProps) => {
  const gpuServer = useAppSelector((state: RootState) => selectGpuServerById(state, serverId));

  const { serverName, isOn, performance, runningJobName, waitingJobCount } = gpuServer! ?? {};
  const memberType = useAppSelector(selectMemberType);

  const { isLoading } = useAppSelector((state: RootState) =>
    selectGpuServerStatus(state, deleteGpuServerById)
  );

  const dispatch = useAppDispatch();

  const [isConfirmOpen, openConfirm, closeConfirm] = useBoolean(false);

  const showToast = useToast();

  const handleDelete = async () => {
    try {
      closeConfirm();
      await dispatch(deleteGpuServerById(serverId)).unwrap();

      showToast({
        type: "success",
        title: `GPU 서버 삭제 성공`,
        message: `${serverName}을(를) 삭제하였습니다.`,
      });
    } catch (err) {
      const error = err as SerializedError;

      showToast({
        type: "error",
        title: error.name!,
        message: error.message,
      });
    }
  };

  const moveToDetailPage = useMoveToPage(`${PATH.GPU_SERVER.VIEW}/${serverId}`);

  return (
    <>
      <Dialog
        open={isConfirmOpen}
        onClose={closeConfirm}
        onCancel={closeConfirm}
        onConfirm={handleDelete}
      >
        <Text size="md" weight="regular">
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
          <Button className="button" color="primary" onClick={moveToDetailPage}>
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

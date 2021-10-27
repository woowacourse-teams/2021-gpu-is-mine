import { useEffect } from "react";
import type { SerializedError } from "@reduxjs/toolkit";
import { fetchAllGpuServer, selectAllGpuServerIds, selectGpuServerStatus } from "../gpuServerSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useBreakpoints } from "../../../hooks";
import { Text, Loading, useToast } from "../../../components";
import GpuServerInfoItem from "../GpuServerInfoItem/GpuServerInfoItem";
import { StyledInfoList } from "./GpuServerInfoList.styled";
import type { RootState } from "../../../app/store";

interface GpuServerInfoListProps {
  className?: string;
}

const GpuServerInfoList = ({ ...rest }: GpuServerInfoListProps) => {
  const { isMobile } = useBreakpoints();

  const { isLoading } = useAppSelector((state: RootState) =>
    selectGpuServerStatus(state, fetchAllGpuServer)
  );

  const serverIds = useAppSelector(selectAllGpuServerIds);

  const dispatch = useAppDispatch();

  const showToast = useToast();

  useEffect(() => {
    dispatch(fetchAllGpuServer())
      .unwrap()
      .catch((err) => {
        const error = err as SerializedError;

        showToast({ type: "error", title: error.name!, message: error.message });
      });
  }, [dispatch, showToast]);

  return (
    <>
      {isLoading && <Loading size="lg" />}

      <StyledInfoList {...rest}>
        {!isLoading && serverIds.length === 0 ? (
          <Text size={isMobile ? "md" : "lg"} weight="bold">
            🚫 등록된 GPU 서버가 존재하지 않습니다.
          </Text>
        ) : (
          serverIds.map((serverId: number) => (
            <GpuServerInfoItem key={serverId} serverId={serverId} />
          ))
        )}
      </StyledInfoList>
    </>
  );
};

export default GpuServerInfoList;

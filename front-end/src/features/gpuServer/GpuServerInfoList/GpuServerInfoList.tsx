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

  const { isLoading, isSucceed, isSettled } = useAppSelector((state: RootState) =>
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
        {isSettled && serverIds.length === 0 ? (
          <Text size={isMobile ? "md" : "lg"} weight="bold">
            {isSucceed
              ? "π« λ±λ‘λ GPU μλ²κ° μ‘΄μ¬νμ§ μμ΅λλ€."
              : "GPU μλ²λ₯Ό κ°μ Έμ€λλ° μ€ν¨νμμ΅λλ€ π"}
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

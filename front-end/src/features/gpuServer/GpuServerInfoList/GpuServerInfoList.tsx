import { useEffect } from "react";
import { MESSAGE } from "../../../constants";
import { fetchAllGpuServer, selectAllGpuServerIds, selectGpuServerStatus } from "../gpuServerSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useBreakpoints } from "../../../hooks";
import { Text, Loading } from "../../../components";
import GpuServerInfoItem from "../GpuServerInfoItem/GpuServerInfoItem";
import { StyledInfoList } from "./GpuServerInfoList.styled";
import type { RootState } from "../../../app/store";

interface GpuServerInfoListProps {
  className?: string;
}

const GpuServerInfoList = ({ ...rest }: GpuServerInfoListProps) => {
  const { isMobile } = useBreakpoints();

  const { isLoading, isSucceed, isFailed } = useAppSelector((state: RootState) =>
    selectGpuServerStatus(state, fetchAllGpuServer)
  );

  const serverIds = useAppSelector(selectAllGpuServerIds);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllGpuServer());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loading size="lg" />}

      {isFailed && (
        <Text size={isMobile ? "md" : "lg"} weight="bold">
          {MESSAGE.ERROR.SERVER}
        </Text>
      )}

      <StyledInfoList {...rest}>
        {isSucceed && serverIds.length === 0 ? (
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

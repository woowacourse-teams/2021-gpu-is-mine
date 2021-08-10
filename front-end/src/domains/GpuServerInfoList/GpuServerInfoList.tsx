import { useEffect } from "react";
import { useGetGpuServerAll, useBreakpoints } from "../../hooks";
import { Text, Loading } from "../../components";
import GpuServerInfoItem from "../GpuServerInfoItem/GpuServerInfoItem";
import { StyledInfoList } from "./GpuServerInfoList.styled";
import { MESSAGE } from "../../constants";
import { MemberType } from "../../types";

interface GpuServerInfoListProps {
  className?: string;
  labId: number;
  memberType: MemberType;
}

const GpuServerInfoList = ({ labId, memberType, ...rest }: GpuServerInfoListProps) => {
  const { isTablet, isLaptop } = useBreakpoints();

  const { data, status, makeRequest } = useGetGpuServerAll({ labId });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    makeRequest();
  }, [makeRequest]);

  return (
    <>
      {status === "loading" && <Loading size="lg" />}

      {status === "failed" && (
        <Text size={isTablet || isLaptop ? "lg" : "md"} weight="bold">
          {MESSAGE.ERROR.SERVER}
        </Text>
      )}

      {status === "succeed" && data && (
        <StyledInfoList {...rest}>
          {data.gpuServers.length === 0 ? (
            <Text size={isTablet || isLaptop ? "lg" : "md"} weight="bold">
              🚫 등록된 GPU 서버가 존재하지 않습니다.
            </Text>
          ) : (
            data.gpuServers.map((res) => (
              <GpuServerInfoItem
                key={res.id}
                refresh={() => makeRequest()}
                memberType={memberType}
                {...res}
              />
            ))
          )}
        </StyledInfoList>
      )}
    </>
  );
};

export default GpuServerInfoList;

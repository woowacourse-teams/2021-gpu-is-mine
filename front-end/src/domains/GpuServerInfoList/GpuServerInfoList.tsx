import { useEffect } from "react";
import { useGetGpuServerAll, useBreakpoints } from "../../hooks";
import { Text, Loading } from "../../components";
import GpuServerInfoItem from "../GpuServerInfoItem/GpuServerInfoItem";
import { StyledInfoList } from "./GpuServerInfoList.styled";
import { MESSAGE } from "../../constants";

const GpuServerInfoList = () => {
  const { isTablet, isLaptop } = useBreakpoints();

  const { data, status, makeRequest } = useGetGpuServerAll({ labId: 1 });

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
        <StyledInfoList>
          {data.gpuServers.length === 0 ? (
            <Text size={isTablet || isLaptop ? "lg" : "md"} weight="bold">
              🚫 등록된 GPU 서버가 존재하지 않습니다.
            </Text>
          ) : (
            data.gpuServers.map((res) => (
              <GpuServerInfoItem refresh={makeRequest} key={res.id} {...res} />
            ))
          )}
        </StyledInfoList>
      )}
    </>
  );
};

export default GpuServerInfoList;

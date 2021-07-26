import { useEffect } from "react";
import { useFetch, useBreakpoints } from "../../hooks";
import { Text, Loading } from "../../components";
import GpuServerInfoItem from "../GpuServerInfoItem/GpuServerInfoItem";
import { StyledInfoList } from "./GpuServerInfoList.styled";
import { API_ENDPOINT } from "../../constants";
import { GpuServerViewResponses } from "../../types";

const GpuServerInfoList = () => {
  const { isTablet, isLaptop } = useBreakpoints();

  const { data, status, makeRequest } = useFetch<GpuServerViewResponses>(
    API_ENDPOINT.LABS(1).GPUS,
    { method: "get" }
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    makeRequest();
  }, [makeRequest]);

  return (
    <>
      {status === "loading" && <Loading size="lg" />}

      {status === "failed" && (
        <Text size={isTablet || isLaptop ? "lg" : "md"} weight="bold">
          장애가 발생했습니다. 관리자에게 문의해주세요.
        </Text>
      )}

      {status === "succeed" && (
        <StyledInfoList>
          {data?.gpuServers.length === 0 ? (
            <Text size={isTablet || isLaptop ? "lg" : "md"} weight="bold">
              🚫 등록된 GPU 서버가 존재하지 않습니다.
            </Text>
          ) : (
            data?.gpuServers.map((res) => (
              <GpuServerInfoItem refresh={makeRequest} key={res.id} {...res} />
            ))
          )}
        </StyledInfoList>
      )}
    </>
  );
};

export default GpuServerInfoList;

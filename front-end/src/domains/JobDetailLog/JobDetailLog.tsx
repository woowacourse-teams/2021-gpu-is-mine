import { RefObject, useEffect, useRef, useState } from "react";
import { REFRESH_TIME } from "../../constants";
import { useGetJobDetailLog, useInterval } from "../../hooks";
import { Loading, Text } from "../../components";
import JobDetailLogContent from "../JobDetailLogContent/JobDetailLogContent";
import {
  StyledJobDetailLog,
  LogConsole,
  LogHeader,
  RefreshButton,
  LogRefreshPanel,
} from "./JobDetailLog.styled";

interface JobDetailLogProps {
  className?: string;
  labId: number;
  jobId: number;
  interval: boolean;
}

const useClientWidth = (ref: RefObject<HTMLElement>) => {
  const [clientWidth, setClientWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const element = ref.current;

      if (element) {
        setClientWidth(element.clientWidth);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [ref]);

  return clientWidth;
};

const JobDetailLog = ({ labId, jobId, interval, ...rest }: JobDetailLogProps) => {
  const { data, makeRequest, done, isFailed, isLoading } = useGetJobDetailLog({
    labId,
    jobId,
  });

  const logConsoleRef = useRef<HTMLDivElement>(null);

  const width = useClientWidth(logConsoleRef);

  const refreshLog = () => makeRequest();

  useInterval(refreshLog, interval ? REFRESH_TIME : null);

  useEffect(() => {
    makeRequest();

    return done;
  }, [makeRequest, done]);

  return (
    <StyledJobDetailLog {...rest}>
      <LogHeader>
        <Text as="h3" weight="bold" size="lg">
          Log
        </Text>
        <LogRefreshPanel>
          {isFailed && (
            <Text size="sm" weight="medium" color="error">
              Log 데이터를 불러오는데 실패했습니다.
            </Text>
          )}
          <RefreshButton color="secondary" disabled={isLoading} onClick={refreshLog}>
            {isLoading && <Loading />}
            새로고침
          </RefreshButton>
        </LogRefreshPanel>
      </LogHeader>
      <LogConsole ref={logConsoleRef}>
        {data?.logs == null || data?.logs.length === 0 ? (
          <Text size="sm">로그 데이터가 존재하지 않습니다.</Text>
        ) : (
          <JobDetailLogContent logs={data.logs} width={width} />
        )}
      </LogConsole>
    </StyledJobDetailLog>
  );
};

export default JobDetailLog;

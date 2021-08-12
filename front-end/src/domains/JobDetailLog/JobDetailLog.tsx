import { useEffect } from "react";
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
  isRunning: boolean;
}

const JobDetailLog = ({ labId, jobId, isRunning, ...rest }: JobDetailLogProps) => {
  const { data, makeRequest, done, isFailed, isLoading } = useGetJobDetailLog({
    labId,
    jobId,
  });

  const refreshLog = () => makeRequest();

  useInterval(refreshLog, isRunning ? REFRESH_TIME : null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
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
      <LogConsole>
        <JobDetailLogContent logs={data?.logs} />
      </LogConsole>
    </StyledJobDetailLog>
  );
};

export default JobDetailLog;

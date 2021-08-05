import { useEffect } from "react";
import { useGetJobDetailLog } from "../../hooks";
import { Loading, Text } from "../../components";
import JobDetailLogContent from "../JobDetailLogContent/JobDetailLogContent";
import {
  StyledJobDetailLog,
  LogConsole,
  LogHeader,
  RefreshButton,
  LogRefreshPanel,
  ErrorText,
} from "./JobDetailLog.styled";

interface JobDetailLogProps {
  className?: string;
  labId: number;
  jobId: number;
}

const JobDetailLog = ({ labId, jobId, ...rest }: JobDetailLogProps) => {
  const { data, makeRequest, done, isFailed, isLoading } = useGetJobDetailLog({
    labId,
    jobId,
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    makeRequest();

    return done;
  }, [makeRequest, done]);

  const refreshLog = () => makeRequest();

  return (
    <StyledJobDetailLog {...rest}>
      <LogHeader>
        <Text as="h3" weight="bold" size="lg">
          Log
        </Text>
        <LogRefreshPanel>
          {isLoading && <Loading />}
          {isFailed && (
            <ErrorText size="sm" weight="medium">
              Log 데이터를 불러오는데 실패했습니다.
            </ErrorText>
          )}
          <RefreshButton color="secondary" disabled={isLoading} onClick={refreshLog}>
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

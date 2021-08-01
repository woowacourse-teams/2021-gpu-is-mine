import { useEffect, useState } from "react";
import { useGetJobDetailLog } from "../../hooks";
import { unwrapResult } from "../../hooks/useFetch/useFetch";
import { Text } from "../../components";
import { StyledJobDetailLog, LogConsole, LogHeader, RefreshButton } from "./JobDetailLog.styled";

interface JobDetailLogProps {
  className?: string;
  labId: number;
  jobId: number;
}

const NormalLog = ({ logs }: { logs: string[] }) => (
  <>
    {logs.length === 0 ? (
      <Text size="sm">로그 데이터가 존재하지 않습니다.</Text>
    ) : (
      logs.map((line) => (
        <Text size="sm" key={line}>
          {line}
        </Text>
      ))
    )}
  </>
);

const FailedLog = ({ logs }: { logs: string[] }) => (
  <>
    {logs.map((line) => (
      <Text size="sm" key={line}>
        {line}
      </Text>
    ))}
    <Text size="sm">Log 데이터를 불러오는데 실패했습니다.</Text>
  </>
);

const JobDetailLog = ({ labId, jobId, ...rest }: JobDetailLogProps) => {
  const { data, makeRequest, status } = useGetJobDetailLog({ labId, jobId });
  const [cachedLog, setCachedLog] = useState([""]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    makeRequest()
      .then(unwrapResult)
      .then(({ logs }) => setCachedLog(logs))
      .catch((err) => console.error(err));
  }, [makeRequest]);

  const refreshLog = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    makeRequest();
  };

  return (
    <StyledJobDetailLog {...rest}>
      <LogHeader>
        <Text as="h3" weight="bold" size="lg">
          Log
        </Text>
        <RefreshButton color="secondary" disabled={status === "loading"} onClick={refreshLog}>
          로그 조회
        </RefreshButton>
      </LogHeader>
      <LogConsole>
        {status === "loading" && <Text size="sm">로그 데이터를 불러오는 중입니다</Text>}
        {status === "failed" && <FailedLog logs={cachedLog} />}
        {status === "succeed" && data && <NormalLog logs={data.logs} />}
      </LogConsole>
    </StyledJobDetailLog>
  );
};

export default JobDetailLog;

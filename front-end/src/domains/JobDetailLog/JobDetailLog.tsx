import { useEffect, useState } from "react";
import { useGetJobDetailLog } from "../../hooks";
import { unwrapResult } from "../../hooks/useFetch/useFetch";
import { Text } from "../../components";
import { StyledJobDetailLog, LogConsole } from "./JobDetailLog.styled";

interface JobDetailLogProps {
  className?: string;
  labId: number;
  jobId: number;
}

const JobDetailLog = ({ labId, jobId, ...rest }: JobDetailLogProps) => {
  const { data, makeRequest, status } = useGetJobDetailLog({ labId, jobId });
  const [cachedLog, setCachedLog] = useState([""]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    makeRequest()
      .then(unwrapResult)
      .then((data) => setCachedLog(data.logs))
      .catch((err) => console.error(err));
  }, [makeRequest]);

  return (
    <StyledJobDetailLog {...rest}>
      <Text as="h3" weight="bold" size="lg">
        Log
      </Text>
      <LogConsole>
        {status === "loading" && <NormalLog logs={cachedLog} />}
        {status === "failed" && <FailedLog logs={cachedLog} />}
        {status === "succeed" && data && <NormalLog logs={data.logs} />}
      </LogConsole>
    </StyledJobDetailLog>
  );
};

const NormalLog = ({ logs }: { logs: string[] }) => (
  <>
    {logs.map((line) => (
      <Text size="sm" key={line}>
        {line}
      </Text>
    ))}
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

export default JobDetailLog;

import { useEffect } from "react";
import { useGetJobDetailLog } from "../../hooks";
import { Text } from "../../components";
import { StyledJobDetailLog, LogConsole } from "./JobDetailLog.styled";

interface JobDetailLogProps {
  className?: string;
  labId: number;
  jobId: number;
}

const JobDetailLog = ({ labId, jobId, ...rest }: JobDetailLogProps) => {
  const { data, makeRequest, status } = useGetJobDetailLog({ labId, jobId });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    makeRequest();
  }, [makeRequest]);

  return (
    <StyledJobDetailLog {...rest}>
      <Text as="h3" weight="bold" size="lg">
        Log
      </Text>
      <LogConsole>
        {status === "failed" && <Text size="sm">Log 데이터를 불러오는데 실패했습니다.</Text>}
        {status === "succeed" &&
          data?.logs.map((line) => (
            <Text size="sm" key={line}>
              {line}
            </Text>
          ))}
      </LogConsole>
    </StyledJobDetailLog>
  );
};

export default JobDetailLog;

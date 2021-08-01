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
  const { data, makeRequest } = useGetJobDetailLog({ labId, jobId });

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
        {data?.logs.map((line) => (
          <Text size="sm" key={line}>
            {line}
          </Text>
        ))}
      </LogConsole>
    </StyledJobDetailLog>
  );
};

export default JobDetailLog;

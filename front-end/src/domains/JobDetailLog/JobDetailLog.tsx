import { Text } from "../../components";
import { StyledJobDetailLog, LogConsole } from "./JobDetailLog.styled";

interface JobDetailLogProps {
  className?: string;
  logs: string[];
}

const JobDetailLog = ({ logs, ...rest }: JobDetailLogProps) => (
  <StyledJobDetailLog {...rest}>
    <Text as="h3" weight="bold" size="lg">
      Log
    </Text>
    <LogConsole>
      {logs.map((line) => (
        <Text size="sm" key={line}>
          {line}
        </Text>
      ))}
    </LogConsole>
  </StyledJobDetailLog>
);

export default JobDetailLog;

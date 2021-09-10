import { Text } from "../../components";
import { StyledText } from "./JobDetailLogConent.styled";

interface JobDetailLogContentProps {
  logs?: string[];
  className?: string;
}

const JobDetailLogContent = ({ logs, ...rest }: JobDetailLogContentProps) => {
  if (logs == null || logs.length === 0) {
    return <Text size="sm">로그 데이터가 존재하지 않습니다.</Text>;
  }

  return (
    <article {...rest}>
      {logs.map((line, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <StyledText forwardedAs="pre" size="sm" key={`${line}_${index}`}>
          {line}
        </StyledText>
      ))}
    </article>
  );
};

export default JobDetailLogContent;

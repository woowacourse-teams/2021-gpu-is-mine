import { Text } from "../../components";

interface JobDetailLogContentProps {
  logs?: string[];
  className?: string;
}

const JobDetailLogContent = ({ logs, ...rest }: JobDetailLogContentProps) => {
  if (logs == null || logs.length === 0) {
    return <Text size="sm">로그 데이터가 존재하지 않습니다.</Text>;
  }

  return (
    <ol {...rest}>
      {logs.map((line) => (
        <Text size="sm" key={line}>
          {line}
        </Text>
      ))}
    </ol>
  );
};

export default JobDetailLogContent;

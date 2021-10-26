import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { Text } from "../../components";
import { StyledText } from "./JobDetailLogConent.styled";

interface JobDetailLogContentProps {
  logs?: string[];
  maxOneLineLength: number;
  className?: string;
}

const JobDetailLogContent = ({ logs, maxOneLineLength, ...rest }: JobDetailLogContentProps) => {
  console.log(maxOneLineLength);

  if (logs == null || logs.length === 0) {
    return <Text size="sm">로그 데이터가 존재하지 않습니다.</Text>;
  }

  const replacedLogs = logs
    .map((line) => line.replace(/(\n\r|\r)/g, "\n"))
    .flatMap((line) => line.split("\n"))
    .flatMap((line) => [line.slice(0, maxOneLineLength), line.slice(maxOneLineLength)])
    .filter((line) => line !== "");

  return (
    <List
      width="100%"
      height={400}
      itemSize={30}
      itemCount={replacedLogs.length}
      itemData={replacedLogs}
      {...rest}
    >
      {({ index, data, ...args }: ListChildComponentProps<string[]>) => (
        <StyledText forwardedAs="pre" size="sm" {...args}>
          {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            data[index]
          }
        </StyledText>
      )}
    </List>
  );
};

export default JobDetailLogContent;

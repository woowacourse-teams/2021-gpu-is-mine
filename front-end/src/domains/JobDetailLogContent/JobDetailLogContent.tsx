import { useMemo, useRef } from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { useBreakpoints } from "../../hooks";
import { StyledText } from "./JobDetailLogConent.styled";

interface JobDetailLogContentProps {
  logs: string[];
  width: number;
  className?: string;
}

const JobDetailLogContent = ({ width, logs, ...rest }: JobDetailLogContentProps) => {
  const logsRef = useRef(logs);

  const { isLaptop } = useBreakpoints();

  const maxOneLineLength = isLaptop ? Math.floor(width / 11) : Math.floor(width / 8.5);

  const replacedLogs = useMemo(
    () =>
      logsRef.current
        .map((line) => line.replace(/(\n\r|\r)/g, "\n"))
        .flatMap((line) => line.split("\n"))
        // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
        .flatMap((line) => line.match(new RegExp(`.{1,${maxOneLineLength}}`, "g")) ?? [])
        .filter((line) => line !== ""),
    [maxOneLineLength]
  );

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
        <StyledText forwardedAs="pre" size={isLaptop ? "sm" : "xs"} {...args}>
          {data[index]}
        </StyledText>
      )}
    </List>
  );
};

export default JobDetailLogContent;

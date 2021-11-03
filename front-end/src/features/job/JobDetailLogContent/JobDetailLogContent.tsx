import { useEffect, useRef, useState } from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { useBreakpoints } from "../../../hooks";
import { StyledText } from "./JobDetailLogConent.styled";

interface JobDetailLogContentProps {
  logs: string[];
  width: number;
  className?: string;
}

const useMemoReplacedLogs = (logs: string[], maxOneLineLength: number) => {
  const [replacedLogs, setReplacedLogs] = useState<string[]>([]);
  const prevLogsLengthRef = useRef(0);

  useEffect(() => {
    if (prevLogsLengthRef.current === logs.length) return;

    const oneLineRegExp = new RegExp(`([^\n\r]{1,${maxOneLineLength}})[\n\r]+`, "g");

    const newLogs = logs.flatMap((line) => line.match(oneLineRegExp) ?? []);

    prevLogsLengthRef.current = newLogs.length;
    setReplacedLogs(newLogs);
  }, [logs, maxOneLineLength]);

  return replacedLogs;
};

const JobDetailLogContent = ({ width, logs, ...rest }: JobDetailLogContentProps) => {
  const { isLaptop } = useBreakpoints();

  const pxPerCharacter = isLaptop ? 11 : 8.5;
  const maxOneLineLength = Math.floor(width / pxPerCharacter);

  const replacedLogs = useMemoReplacedLogs(logs, maxOneLineLength);

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

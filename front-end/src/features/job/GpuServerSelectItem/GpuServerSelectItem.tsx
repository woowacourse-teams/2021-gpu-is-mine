import { Text, Flicker } from "../../../components";
import { Column, ColumnTitle, ServerColumn, StyledItem } from "./GpuServerSelectItem.styled";
import { GpuServer } from "../../gpuServer/gpuServerSlice";

type GpuServerSelectItemProps = Pick<
  GpuServer,
  "serverName" | "isOn" | "waitingJobCount" | "totalExpectedTime" | "performance"
>;

const GpuServerSelectItem = ({
  serverName,
  isOn,
  performance,
  waitingJobCount,
  totalExpectedTime,
}: GpuServerSelectItemProps) => (
  <StyledItem>
    <ServerColumn>
      <Flicker size="xs" status={isOn ? "ON" : "OFF"} />
      <Text size="sm">{serverName}</Text>
    </ServerColumn>
    <Column>
      <ColumnTitle forwardedAs="span" size="xs">
        성능
      </ColumnTitle>
      <Text as="span" size="xs">
        {performance} TFLOPS
      </Text>
    </Column>
    <Column>
      <ColumnTitle forwardedAs="span" size="xs">
        남은 Job 개수
      </ColumnTitle>
      <Text as="span" size="xs">
        {waitingJobCount} 개
      </Text>
    </Column>
    <Column>
      <ColumnTitle forwardedAs="span" size="xs">
        총 잔여 시간
      </ColumnTitle>
      <Text as="span" size="xs">
        {totalExpectedTime} 시간
      </Text>
    </Column>
  </StyledItem>
);

export default GpuServerSelectItem;

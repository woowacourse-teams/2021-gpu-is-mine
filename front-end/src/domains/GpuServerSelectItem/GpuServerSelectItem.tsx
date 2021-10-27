import { Text, Flicker } from "../../components";
import { StyledItem } from "./GpuServerSelectItem.styled";
import { GpuServer } from "../../features/gpuServer/gpuServerSlice";

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
    <div className="column">
      <Flicker size="xs" status={isOn ? "ON" : "OFF"} />
      <Text size="sm">{serverName}</Text>
    </div>
    <div className="column">
      <Text as="span" size="xs" className="column__title">
        성능
      </Text>
      <Text as="span" size="xs">
        {performance} TFLOPS
      </Text>
    </div>
    <div className="column">
      <Text as="span" size="xs" className="column__title">
        남은 Job 개수
      </Text>
      <Text as="span" size="xs">
        {waitingJobCount} 개
      </Text>
    </div>
    <div className="column">
      <Text as="span" size="xs" className="column__title">
        총 잔여 시간
      </Text>
      <Text as="span" size="xs">
        {totalExpectedTime} 시간
      </Text>
    </div>
  </StyledItem>
);

export default GpuServerSelectItem;

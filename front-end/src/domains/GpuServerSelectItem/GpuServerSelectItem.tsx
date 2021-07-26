import { Text, Flicker } from "../../components";
import { StyledItem } from "./GpuServerSelectItem.styled";
import { GpuServer, GpuBoard } from "../../types";

type GpuServerSelectItemProps = Pick<GpuServer, "serverName" | "isOn" | "jobs"> &
  Pick<GpuBoard, "performance">;

const GpuServerSelectItem = ({ serverName, isOn, performance, jobs }: GpuServerSelectItemProps) => {
  const jobCount = jobs.filter((job) => job.status === "WAITING").length;

  // TODO: 추후 remainingTime 실제 데이터로 변경하기
  const remainingTime = Math.floor(Math.random() * 100);

  return (
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
          {jobCount} 개
        </Text>
      </div>
      <div className="column">
        <Text as="span" size="xs" className="column__title">
          총 잔여 시간
        </Text>
        <Text as="span" size="xs">
          {remainingTime} 시간
        </Text>
      </div>
    </StyledItem>
  );
};

export default GpuServerSelectItem;

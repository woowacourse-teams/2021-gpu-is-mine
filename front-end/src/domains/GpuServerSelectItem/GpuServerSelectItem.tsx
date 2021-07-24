import { Text } from "../../components";
import { StyledItem } from "./GpuServerSelectItem.styled";
import { GpuServer, GpuBoard } from "../../types";

// TODO: 꺼진 서버 목록에 띄어주기 VS 안보여주기
// TODO: 역할을 누구에게 줘야할까 고민 => 대기 중인 Job개수 & 잔여 시간을 위에서 구한다 vs 본인이 구한다.

type GpuServerSelectItemProps = Pick<GpuServer, "serverName" | "isOn"> &
  Pick<GpuBoard, "performance"> & {
    jobCount: number;
    remainingTime: number;
  };

const GpuServerSelectItem = ({
  serverName,
  isOn,
  performance,
  jobCount,
  remainingTime,
}: GpuServerSelectItemProps) => (
  <StyledItem>
    <div className="column">
      <Text size="sm">{serverName}</Text>
    </div>
    <div className="column">
      <Text tag="span" size="xs" className="column__title">
        성능
      </Text>
      <Text tag="span" size="xs">
        {performance} TFLOPS
      </Text>
    </div>
    <div className="column">
      <Text tag="span" size="xs" className="column__title">
        남은 Job 개수
      </Text>
      <Text tag="span" size="xs">
        {jobCount} 개
      </Text>
    </div>
    <div className="column">
      <Text tag="span" size="xs" className="column__title">
        총 잔여 시간
      </Text>
      <Text tag="span" size="xs">
        {remainingTime} 시간
      </Text>
    </div>
  </StyledItem>
);

export default GpuServerSelectItem;

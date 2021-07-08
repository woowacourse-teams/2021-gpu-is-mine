import { Optional } from "../../types/util";
import { StyledFlicker, StyledFlickerProps } from "./Flicker.styled";

type FlickerProps = Optional<StyledFlickerProps, "size">;

const Flicker = ({ status, size = "md" }: FlickerProps) => (
  <StyledFlicker status={status} size={size} />
);

export default Flicker;

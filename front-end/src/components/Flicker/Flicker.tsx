import { Optional } from "../../types/util";
import { StyledFlicker, StyledFlickerProps } from "./Flicker.styled";

type FlickerProps = Optional<StyledFlickerProps, "size"> & HTMLAttributes<HTMLElement>;

const Flicker = ({ status, size = "md", ...rest }: FlickerProps) => (
  <StyledFlicker status={status} size={size} {...rest} />
);

export default Flicker;

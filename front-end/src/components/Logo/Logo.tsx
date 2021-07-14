import GpuIcon from "../GpuIcon/GpuIcon";
import Text from "../Text/Text";
import { StyledLogo } from "./Logo.styled";

const Logo = () => (
  <StyledLogo>
    <GpuIcon size="lg" />
    <Text size="lg" weight="bold">
      GPU 내껀데
    </Text>
  </StyledLogo>
);

export default Logo;

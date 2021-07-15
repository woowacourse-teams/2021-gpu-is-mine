import { Link } from "react-router-dom";
import GpuIcon from "../GpuIcon/GpuIcon";
import Text from "../Text/Text";
import { StyledLogo } from "./Logo.styled";

const Logo = () => (
  <Link to="/">
    <StyledLogo>
      <GpuIcon size="lg" />
      <Text size="lg" weight="bold">
        GPU 내껀데
      </Text>
    </StyledLogo>
  </Link>
);

export default Logo;

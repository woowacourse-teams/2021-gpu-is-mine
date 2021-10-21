import { Link } from "react-router-dom";
import GpuIcon from "../GpuIcon/GpuIcon";
import { StyledLogo, StyledText } from "./Logo.styled";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => (
  <Link to="/" className={className}>
    <StyledLogo>
      <GpuIcon size="lg" />
      <StyledText size="lg" weight="bold">
        <span>GPU</span>
        <span>내껀데</span>
      </StyledText>
    </StyledLogo>
  </Link>
);

export default Logo;

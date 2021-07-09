import { StyledGpuIcon, StyledGpuIconProps } from "./GpuIcon.styled";

type GpuIconProps = Partial<StyledGpuIconProps>;

const GpuIcon = ({ size = "sm" }: GpuIconProps) => <StyledGpuIcon size={size} />;

export default GpuIcon;

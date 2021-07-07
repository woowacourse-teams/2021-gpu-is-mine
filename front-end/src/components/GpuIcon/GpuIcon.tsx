import { StyledGpu, StyledGpuProps } from "./GpuIcon.styled";

type GpuIconProps = Partial<StyledGpuProps>;

const GpuIcon = ({ size = "sm" }: GpuIconProps) => <StyledGpu size={size} />;

export default GpuIcon;

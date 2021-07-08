import { StyledServer, StyledServerProps } from "./ServerIcon.styled";

type GpuIconProps = Partial<StyledServerProps>;

const GpuIcon = ({ size = "md" }: GpuIconProps) => <StyledServer size={size} />;

export default GpuIcon;

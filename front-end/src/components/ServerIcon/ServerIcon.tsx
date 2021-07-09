import { StyledServerIcon, StyledServerIconProps } from "./ServerIcon.styled";

type ServerIconProps = Partial<StyledServerIconProps>;

const ServerIcon = ({ size = "md" }: ServerIconProps) => <StyledServerIcon size={size} />;

export default ServerIcon;

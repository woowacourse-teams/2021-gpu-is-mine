import { HTMLAttributes } from "react";
import { StyledServerIcon, StyledServerIconProps } from "./ServerIcon.styled";

type ServerIconProps = Partial<StyledServerIconProps> & HTMLAttributes<HTMLOrSVGElement>;

const ServerIcon = ({ size = "md", ...rest }: ServerIconProps) => (
  <StyledServerIcon size={size} {...rest} />
);

export default ServerIcon;

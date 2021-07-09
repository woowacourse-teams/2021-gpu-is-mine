import styled, { css } from "styled-components";
import Gpu from "./gpu.svg";

export type Size = "sm" | "md" | "lg";

export interface StyledGpuIconProps {
  size: Size;
}

const getSizeStyle = (size: Size) => {
  const style = {
    sm: css`
      width: 1rem;
      height: 1rem;
    `,
    md: css`
      width: 2rem;
      height: 2rem;
    `,
    lg: css`
      width: 3rem;
      height: 3rem;
    `,
  };

  return style[size];
};

export const StyledGpuIcon = styled(Gpu)`
  ${({ size }: StyledGpuIconProps) => getSizeStyle(size)}
`;

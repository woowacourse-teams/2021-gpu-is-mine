import styled, { css } from "styled-components";
import Gpu from "./gpu.svg";

export type Size = "sm" | "md" | "lg";

export interface StyledGpuProps {
  size: Size;
}

const IconSize = {
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
} as const;

export const StyledGpu = styled(Gpu)`
  ${({ size }: StyledGpuProps) => IconSize[size]}
`;

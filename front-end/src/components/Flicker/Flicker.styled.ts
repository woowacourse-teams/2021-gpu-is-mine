import styled, { css, keyframes } from "styled-components";

type FlickerStatus = "ON" | "WARNING";
type Size = "sm" | "md" | "lg";

export interface StyledFlickerProps {
  status: FlickerStatus;
  size: Size;
}

const flick = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const getFlickerStatus = (status: FlickerStatus) => {
  const flickerType = {
    // TODO: flicker color 상수화
    ON: css`
      background-color: #90dd53;
      animation: ${flick} 0.5s ease-in-out infinite alternate;
    `,
    WARNING: css`
      background-color: #f86565;
      animation: ${flick} 0.3s ease-in-out infinite alternate;
    `,
  } as const;

  return flickerType[status];
};

const getFlickerSize = (size: Size) => {
  const flickerSize = {
    // TODO: flicker color 상수화
    sm: css`
      width: 1rem;
      height: 1rem;
    `,
    md: css`
      width: 1.5rem;
      height: 1.5rem;
    `,
    lg: css`
      width: 2.5rem;
      height: 2.5rem;
    `,
  } as const;

  return flickerSize[size];
};

export const StyledFlicker = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;

  ${({ status }: StyledFlickerProps) => getFlickerStatus(status)}
  ${({ size }: StyledFlickerProps) => getFlickerSize(size)}
`;

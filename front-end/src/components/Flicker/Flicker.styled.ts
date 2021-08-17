import styled, { css, keyframes } from "styled-components";

type FlickerStatus = "ON" | "WARNING" | "OFF";
type Size = "xs" | "sm" | "md" | "lg";

export interface StyledFlickerProps {
  status: FlickerStatus;
  size: Size;
}

const flick = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const getStatusStyle = (status: FlickerStatus) => {
  const style = {
    ON: css`
      background-color: var(--active);
      animation: ${flick} 0.5s ease-in-out infinite alternate;
    `,
    WARNING: css`
      background-color: var(--warning);
      animation: ${flick} 0.5s ease-in-out infinite alternate;
    `,
    OFF: css`
      background-color: var(--disabled);
    `,
  } as const;

  return style[status];
};

const getSizeStyle = (size: Size) => {
  const style = {
    xs: css`
      width: 0.625rem;
      height: 0.625rem;
    `,
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

  return style[size];
};

export const StyledFlicker = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  ${({ status }: StyledFlickerProps) => getStatusStyle(status)}
  ${({ size }: StyledFlickerProps) => getSizeStyle(size)}
`;

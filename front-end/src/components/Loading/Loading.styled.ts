import styled, { keyframes, css } from "styled-components";

type Size = "sm" | "md" | "lg" | "xl";

export interface StyledLoadingProps {
  size: Size;
}

const getLoadingIconSize = (size: Size) => {
  const iconSize = {
    sm: css`
      width: 1rem;
      height: 1rem;
      border-width: 4px;
    `,
    md: css`
      width: 2rem;
      height: 2rem;
      border-width: 6px;
    `,
    lg: css`
      width: 3rem;
      height: 3rem;
      border-width: 8px;
    `,
    xl: css`
      width: 5rem;
      height: 5rem;
      border-width: 10px;
    `,
  } as const;

  return iconSize[size];
};

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }

  100%{
    transform: rotate(360deg);
  }
`;

export const StyledLoading = styled.div<StyledLoadingProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    border-style: solid;
    border-color: var(--secondary-500);
    border-right-color: transparent;
    border-image: initial;
    border-radius: 50%;
    animation: 0.75s linear 0s infinite normal none running ${rotate};
    ${({ size }) => getLoadingIconSize(size)}
  }
`;

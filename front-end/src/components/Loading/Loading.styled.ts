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
    `,
    md: css`
      width: 2rem;
      height: 2rem;
    `,
    lg: css`
      width: 3rem;
      height: 3rem;
    `,
    xl: css`
      width: 5rem;
      height: 5rem;
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
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    border-width: 6px;
    border-style: solid;
    border-color: black transparent black black;
    border-image: initial;
    border-radius: 50%;
    animation: 0.75s linear 0s infinite normal none running ${rotate};
    ${({ size }) => getLoadingIconSize(size)}
  }
`;

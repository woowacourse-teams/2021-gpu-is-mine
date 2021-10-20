import styled, { css, keyframes } from "styled-components";
import type { DimmerColor } from "./Dimmer";

interface StyledDimmerProps {
  color: DimmerColor;
}

const getColorStyle = (color: DimmerColor) => {
  const style = {
    transparent: css`
      background-color: rgba(0, 0, 0, 0);
    `,
    light: css`
      background-color: rgba(0, 0, 0, 0.2);
    `,
    dark: css`
      background-color: rgba(0, 0, 0, 0.5);
    `,
  } as const;

  return style[color];
};

export const StyledDimmer = styled.div<StyledDimmerProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 50;
  ${({ color }) => getColorStyle(color)}
`;

const scaleOutAnimation = keyframes`
50% {
  transform: scale(1.02);
}
100% {
  transform: scale(1);
}
`;

export const Inner = styled.div<{ scaleOut: boolean }>`
  isolation: isolate;
  will-change: transform;

  ${({ scaleOut }) =>
    scaleOut &&
    css`
      animation: ${scaleOutAnimation} 0.4s forwards;
    `}
`;

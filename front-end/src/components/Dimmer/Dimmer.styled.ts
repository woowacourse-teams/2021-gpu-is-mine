import styled, { css } from "styled-components";

type DimmerColor = "transparent" | "light" | "dark";

export interface StyledDimmerProps {
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

  .inner {
    isolation: isolate;
  }
`;

// TODO: z-index 상수화

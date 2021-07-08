import styled, { css } from "styled-components";

type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

type FontWeight = "thin" | "light" | "regular" | "medium" | "bold" | "black";

export interface StyledTextProps {
  size: Size;
  weight: FontWeight;
}

const getSizeStyle = (size: Size) => {
  const style = {
    xs: css`
      font-size: 0.75rem;
      line-height: 1rem;
    `,
    sm: css`
      font-size: 1rem;
      line-height: 1.5rem;
    `,
    md: css`
      font-size: 1.25rem;
      line-height: 1.75rem;
    `,
    lg: css`
      font-size: 1.875rem;
      line-height: 2.25rem;
    `,
    xl: css`
      font-size: 3rem;
      line-height: 3.6rem;
    `,
    "2xl": css`
      font-size: 4.5rem;
      line-height: 5.4rem;
    `,
  } as const;

  return style[size];
};

const getFontWeightStyle = (fontWeight: FontWeight) => {
  const style = {
    thin: css`
      font-weight: 100;
    `,
    light: css`
      font-weight: 300;
    `,
    regular: css`
      font-weight: 400;
    `,
    medium: css`
      font-weight: 500;
    `,
    bold: css`
      font-weight: 700;
    `,
    black: css`
      font-weight: 900;
    `,
  } as const;

  return style[fontWeight];
};

export const StyledText = styled.p`
  ${({ size }: StyledTextProps) => getSizeStyle(size)}

  ${({ weight }: StyledTextProps) => getFontWeightStyle(weight)}
`;

import styled, { css } from "styled-components";
import Server from "./server.svg";

export type Size = "sm" | "md" | "lg" | "xl";

export interface StyledServerIconProps {
  size: Size;
}

const getServerIconSize = (size: Size) => {
  const iconSize = {
    sm: css`
      width: 1.5rem;
      height: 1.5rem;
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

  // TODO: 정의되지않은 size 대응하기 => type 에러
  return iconSize[size] || iconSize.md;
};

export const StyledServerIcon = styled(Server)`
  ${({ size }: StyledServerIconProps) => getServerIconSize(size)}
`;

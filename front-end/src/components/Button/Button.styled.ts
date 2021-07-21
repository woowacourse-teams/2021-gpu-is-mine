import styled, { css } from "styled-components";

type Color =
  | "primary"
  | "primary-light"
  | "primary-dark"
  | "secondary-light"
  | "secondary-dark"
  | "secondary"
  | "error";

export interface StyledButtonProps {
  color: Color;
}

const getColorStyle = (color: Color) => {
  const style = {
    primary: css`
      background-color: var(--primary-800);
      color: var(--on-primary-800);
    `,
    "primary-light": css`
      background-color: var(--primary-600);
      color: var(--on-primary-600);
    `,
    "primary-dark": css`
      background-color: var(--primary-900);
      color: var(--on-primary-900);
    `,
    secondary: css`
      background-color: var(--secondary-800);
      color: var(--on-secondary-800);
    `,
    "secondary-light": css`
      background-color: var(--secondary-600);
      color: var(--on-secondary-600);
    `,
    "secondary-dark": css`
      background-color: var(--secondary-900);
      color: var(--on-secondary-900);
    `,
    error: css`
      background-color: var(--error);
      color: var(--on-error);
    `,
  };

  return style[color];
};

export const StyledButton = styled.button`
  ${({ color }: StyledButtonProps) => getColorStyle(color)}

  width: 100%;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;

  &:disabled {
    background-color: var(--disabled);
    color: var(--on-disabled);
    cursor: not-allowed;
  }
`;

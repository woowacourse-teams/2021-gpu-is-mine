import styled, { css } from "styled-components";
import Text from "../Text/Text";

type Size = "sm" | "md" | "lg";

export const Label = styled.label<{ size: Size }>`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${({ size }) =>
    ({
      sm: css`
        row-gap: 0.25rem;
      `,
      md: css`
        row-gap: 0.5rem;
      `,
      lg: css`
        row-gap: 0.75rem;
      `,
    }[size])}
`;

export const StyledInput = styled.input<{ _size: Size; isValid: boolean }>`
  width: 100%;
  border-style: solid;
  border-radius: 0.5rem;

  &:focus {
    outline: none;
  }

  ${({ _size }) =>
    // eslint-disable-next-line no-underscore-dangle
    ({
      sm: css`
        padding: 0.25rem 0.75rem;
        font-size: 1rem;
        line-height: 1.5rem;
        border-width: 2px;
      `,
      md: css`
        padding: 0.5rem 0.75rem;
        font-size: 1.25rem;
        line-height: 1.75rem;
        border-width: 2px;
      `,
      lg: css`
        padding: 0.5rem 1rem;
        font-size: 1.875rem;
        line-height: 2.25rem;
        border-width: 3px;
      `,
    }[_size])}

  ${({ isValid }) =>
    isValid
      ? css`
          border-color: var(--primary-700);

          &:focus {
            border-color: var(--secondary-400);
          }
        `
      : css`
          border-color: var(--error);
        `}
`;

export const ValidationMessage = styled(Text)<{ size: "xs" | "sm" | "md" }>`
  color: var(--error);
  margin-left: 0.5rem;

  ${({ size }) =>
    ({
      xs: css`
        min-height: 1rem;
      `,
      sm: css`
        min-height: 1.25rem;
      `,
      md: css`
        min-height: 1.875rem;
      `,
    }[size])}
`;

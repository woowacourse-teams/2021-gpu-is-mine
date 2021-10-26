import styled, { css } from "styled-components";
import Text from "../Text/Text";

export const StyledRadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.75rem;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ValidationMessage = styled(Text)<{ size: "xs" | "sm" | "md" }>`
  color: var(--error);

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

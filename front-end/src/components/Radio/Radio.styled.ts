import styled, { css } from "styled-components";
import { srOnly } from "../../styles";

export const SrOnlyInput = styled.input`
  ${srOnly}
`;

export const SrOnlyLabel = styled.span`
  ${srOnly}
`;

export const RadioButton = styled.span<{ checked: boolean; disabled: boolean; isValid: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid var(--primary-100);
  border-radius: 0.5rem;

  ${({ checked }) =>
    checked &&
    css`
      background-color: var(--primary-100);
      color: var(--on-primary-100);

      &::after {
        content: "✔";
        font-size: 1.25rem;
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: var(--disabled);
      color: var(--on-disabled);
      border: none;
    `}

    input:focus + & {
    border-color: var(--primary-700);
  }

  ${({ isValid }) =>
    !isValid &&
    css`
      border-color: var(--error);
    `}
`;

export const StyledRadio = styled.label<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  column-gap: 0.75rem;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
    `}

  &:hover {
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  }
`;

export const Content = styled.div`
  width: 100%;
`;

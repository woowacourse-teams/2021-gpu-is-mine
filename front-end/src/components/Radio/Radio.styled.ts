import styled, { css } from "styled-components";

export const StyledLabel = styled.label<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  column-gap: 0.75rem;

  ${({ disabled }) => css`
    &:hover {
      cursor: ${disabled ? "not-allowed" : "pointer"};
    }
  `}

  .radio__input {
    display: none;
  }

  .radio__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid var(--primary-100);
    border-radius: 0.5rem;
  }

  .radio__input:checked + .radio__button {
    background-color: var(--primary-100);
    color: var(--on-primary-100);
  }

  .radio__input:disabled + .radio__button {
    background-color: var(--disabled);
    color: var(--on-disabled);
    border: none;
  }

  .radio__input:checked + .radio__button::after {
    content: "✔";
    font-size: 1.25rem;
  }

  .radio__content {
    width: 100%;
  }
`;

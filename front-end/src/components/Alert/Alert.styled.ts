import styled from "styled-components";
import Button from "../Button/Button";

export const StyledAlert = styled.div`
  display: grid;
  grid-template-rows: auto 3rem;
  box-shadow: 0 4px 4px 0 #0005;

  min-width: 18rem;
  max-width: 30rem;
  min-height: 12rem;

  color: var(--on-secondary-50);
  background-color: var(--secondary-50);
  border-radius: 1rem;
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  word-break: break-all;
  padding: 1rem 2rem;
  user-select: none;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledButton = styled(Button)`
  color: var(--on-secondary-50);
  font-size: 1.25rem;
  font-weight: bold;
  box-shadow: 0 0 8px #ccc;
  background-color: var(--secondary-50);
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;

  &:hover {
    background-color: var(--secondary-300);
  }
`;

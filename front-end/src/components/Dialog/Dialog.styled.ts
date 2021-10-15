import styled from "styled-components";
import Button from "../Button/Button";

export const Inner = styled.dialog`
  display: grid;
  grid-template-rows: auto 3rem;
  box-shadow: 0 0 4px 2px rgb(253 243 226 / 30%);

  min-width: 18rem;
  max-width: 30rem;
  min-height: 12rem;

  color: var(--on-secondary-30);
  background-color: var(--secondary-30);
  border-radius: 0.5rem;

  padding: 0;
  position: sticky;
`;

export const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  word-break: break-all;
  padding: 0.5rem 2rem;
  user-select: none;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;

  font-size: 1rem;
`;

export const CancelButton = styled(Button)`
  color: var(--warning);
  background-color: inherit;
  font-weight: 500;

  &:hover {
    background-color: rgba(248, 101, 101, 0.1);
  }
`;

export const ConfirmButton = styled(Button)`
  color: var(--primary-800);
  background-color: inherit;
  font-weight: 500;

  &:hover {
    background-color: rgba(52, 67, 85, 0.1);
  }
`;
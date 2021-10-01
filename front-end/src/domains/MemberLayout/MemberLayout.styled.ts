import styled from "styled-components";
import { Layout } from "../../components";
import { MainContainer, FooterContainer } from "../../components/Layout/Layout.styled";

export const StyledLayout = styled(Layout)`
  background-color: var(--primary-900);
  height: 100%;

  ${MainContainer},
  ${FooterContainer} {
    background-color: var(--primary-700);
    color: var(--on-primary-700);
  }
`;

export const LogoContainer = styled.div`
  background-color: var(--primary-900);
  color: var(--on-primary-900);
  padding: 0.5rem 1rem 0.5rem 0.5rem;

  display: flex;
  justify-content: center;
  column-gap: 1rem;
`;

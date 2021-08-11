import styled from "styled-components";
import { Text } from "../../components";

export const StyledUserNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: var(--primary-900);
  color: var(--on-primary-900);

  row-gap: 2rem;

  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export const Menu = styled(Text)`
  display: flex;
  flex-direction: column;
  row-gap: 0.75rem;
`;

export const MenuTitle = styled(Text)`
  padding-left: 1.5rem;
`;

export const MenuItem = styled(Text)`
  padding-left: 2.25rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;

  &:hover {
    background-color: var(--primary-800);
    color: var(--on-primary-800);
  }

  .active & {
    background-color: var(--secondary-700);
    color: var(--on-secondary-700);
  }
`;

export const LogoutMenu = styled(Menu)`
  margin-top: auto;

  button {
    text-align: left;
  }
`;

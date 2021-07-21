import styled from "styled-components";

export const StyledManagerNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: var(--primary-900);
  color: var(--on-primary-900);

  row-gap: 2rem;

  padding-top: 1rem;
  padding-bottom: 1rem;

  .menu {
    display: flex;
    flex-direction: column;
    row-gap: 0.75rem;
  }

  .menu__title {
    padding-left: 1.5rem;
  }

  .menu__item {
    padding-left: 2.25rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;

    &:hover {
      background-color: var(--primary-800);
      color: var(--on-primary-800);
    }
  }

  .active .menu__item {
    background-color: var(--secondary-700);
    color: var(--on-secondary-700);
  }

  .menu-login {
    margin-top: auto;
  }
`;

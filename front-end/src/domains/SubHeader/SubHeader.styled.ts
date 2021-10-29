import styled, { css } from "styled-components";
import { up } from "styled-breakpoints";
import { Text } from "../../components";
import ManagerNavigation from "../ManagerNavigation/ManagerNavigation";
import UserNavigation from "../UserNavigation/UserNavigation";

export const StyledSubHeader = styled.header`
  cursor: pointer;
  background-color: var(--primary-700);
  color: var(--on-primary-700);

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.5rem 1rem;

  ${up("laptop")} {
    height: 100%;
  }
`;

export const Title = styled.div`
  display: flex;
  column-gap: 0.75rem;
  flex-shrink: 0;
`;

export const TitleName = styled(Text)`
  transition: all 0.1s ease-in-out;

  &:hover {
    color: var(--secondary-600);
  }
`;

export const StyledButton = styled.button`
  user-select: none;
`;

const float = css`
  position: absolute;
  width: 100%;
  z-index: 2000;
`;

export const StyledManagerNavigation = styled(ManagerNavigation)`
  ${float}
`;

export const StyledUserNavigation = styled(UserNavigation)`
  ${float}
`;

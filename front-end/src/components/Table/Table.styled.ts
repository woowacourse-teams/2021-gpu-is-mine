import styled, { css } from "styled-components";
import Button from "../Button/Button";

interface StyledHeadCellProps {
  isSortable: boolean;
}

interface CellSortMarkProp {
  sortActive: boolean;
}

const sortableFieldStyle = css`
  cursor: pointer;
  :hover {
    * {
      opacity: 1;
    }
  }
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2.5rem;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const StyledHeader = styled.thead`
  background-color: var(--primary-600);
  color: var(--on-primary-600);
  position: sticky;
  inset: -1.25rem;
`;

export const StyledBody = styled.tbody`
  border-bottom: 0.25rem solid var(--primary-500);
`;

export const StyledRow = styled.tr`
  border-bottom: 2px solid var(--primary-200);
`;

export const StyledCell = styled.td`
  padding: 1.25rem 1rem;
`;

export const StyledHeadCell = styled.th<StyledHeadCellProps>`
  padding: 1.25rem 1rem;
  text-align: left;

  ${({ isSortable }) => isSortable && sortableFieldStyle}
`;

export const CellSortMark = styled.span<CellSortMarkProp>`
  ${({ sortActive }) => (sortActive ? "opacity: 1" : "opacity: 0")}
`;

export const StyledPagination = styled.div`
  margin-top: auto;
  align-self: flex-end;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.25rem;
`;

export const StyledPageButton = styled(Button)`
  width: 2.5rem;
  font-size: 1.25rem;
  font-weight: bold;
`;

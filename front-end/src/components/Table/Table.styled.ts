import styled, { css } from "styled-components";

interface CellSortMarkProp {
  sortActive: boolean;
  isSortable: boolean;
}

interface StyledHeadCellProps {
  isSortable: boolean;
}

const sortableFieldStyle = css`
  cursor: pointer;
  :hover {
    filter: contrast(200%);
    transition: text-decoration 0.5s ease-in-out;

    * {
      opacity: 1;
    }
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const StyledHeader = styled.thead`
  background-color: var(--primary-600);
  color: var(--on-primary-600);
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

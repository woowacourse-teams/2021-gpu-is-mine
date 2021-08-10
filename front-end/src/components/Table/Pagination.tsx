import Text from "../Text/Text";
import Button from "..//Button/Button";
import { ButtonWrapper, StyledPageButton, StyledPagination } from "./Table.styled";

interface PaginationProps {
  currentPage: number;
  pageRowCount: number;
  totalRowCount: number;
  onPageClick: (num: number) => void;
}

const Pagination = ({ currentPage, pageRowCount, totalRowCount, onPageClick }: PaginationProps) => {
  const lastPage = Math.ceil(totalRowCount / pageRowCount);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === lastPage;

  const goFirstPage = () => onPageClick(-currentPage + 1);

  const goPrevPage = () => {
    if (isFirstPage) return;
    onPageClick(-1);
  };

  const goNextPage = () => {
    if (isLastPage) return;
    onPageClick(1);
  };

  const goLastPage = () => onPageClick(Math.ceil(totalRowCount / pageRowCount) - currentPage);

  return (
    <StyledPagination>
      <ButtonWrapper>
        <StyledPageButton color="primary" onClick={goFirstPage} disabled={isFirstPage}>
          {"<<"}
        </StyledPageButton>
        <StyledPageButton color="primary-light" onClick={goPrevPage} disabled={isFirstPage}>
          {"<"}
        </StyledPageButton>
        <Text size="md" weight="bold">{`${currentPage}/${lastPage}`}</Text>
        <StyledPageButton color="primary-light" onClick={goNextPage} disabled={isLastPage}>
          {">"}
        </StyledPageButton>
        <StyledPageButton color="primary" onClick={goLastPage} disabled={isLastPage}>
          {">>"}
        </StyledPageButton>
      </ButtonWrapper>
    </StyledPagination>
  );
};

export default Pagination;

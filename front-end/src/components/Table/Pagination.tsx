import { usePagination } from "../../hooks";
import Text from "../Text/Text";
import { ButtonWrapper, StyledPageButton, StyledPagination } from "./Table.styled";

type PaginationProps = Omit<ReturnType<typeof usePagination>, "contentsLengthPerPage">;

const Pagination = ({
  currentPage,
  lastPage,
  isFirstPage,
  isLastPage,
  goToFirstPage,
  goToLastPage,
  goToNextPage,
  goToPrevPage,
}: PaginationProps) => (
  <StyledPagination>
    <ButtonWrapper>
      <StyledPageButton color="primary" onClick={goToFirstPage} disabled={isFirstPage}>
        {"<<"}
      </StyledPageButton>
      <StyledPageButton color="primary-light" onClick={goToPrevPage} disabled={isFirstPage}>
        {"<"}
      </StyledPageButton>
      <Text size="md" weight="bold">{`${currentPage}/${lastPage}`}</Text>
      <StyledPageButton color="primary-light" onClick={goToNextPage} disabled={isLastPage}>
        {">"}
      </StyledPageButton>
      <StyledPageButton color="primary" onClick={goToLastPage} disabled={isLastPage}>
        {">>"}
      </StyledPageButton>
    </ButtonWrapper>
  </StyledPagination>
);

export default Pagination;

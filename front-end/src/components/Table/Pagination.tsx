import { usePagination } from "../../hooks";
import Text from "../Text/Text";
import { ButtonWrapper, StyledPageButton, StyledPagination } from "./Table.styled";

type PaginationProps = Omit<ReturnType<typeof usePagination>, "contentsLengthPerPage">;

const Pagination = ({
  currentPage,
  lastPage,
  isFirstPage,
  isLastPage,
  goFirstPage,
  goLastPage,
  goNextPage,
  goPrevPage,
}: PaginationProps) => (
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

export default Pagination;

import Text from "../Text/Text";
import { ButtonWrapper, StyledPageButton, StyledPagination } from "./Table.styled";
import { usePagination } from "hooks";

type PaginationProps = Omit<ReturnType<typeof usePagination>, "contentsLengthPerPage">;

const Pagination = ({
  currentPage,
  pageInfo,
  goFirstPage,
  goLastPage,
  goNextPage,
  goPrevPage,
}: PaginationProps) => {
  const { isFirstPage, isLastPage, lastPage } = pageInfo;

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

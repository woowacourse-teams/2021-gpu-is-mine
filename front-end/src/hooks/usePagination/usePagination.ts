import { useState } from "react";

interface UsePaginationProps {
  count: number;
  totalContentsLength: number;
}

const usePagination = ({ count, totalContentsLength }: UsePaginationProps) => {
  const firstPage = totalContentsLength === 0 ? 0 : 1;

  const [page, setPage] = useState(firstPage);
  const [contentsLengthPerPage, setContentsLengthPerPage] = useState(count);

  const lastPage = Math.ceil(totalContentsLength / contentsLengthPerPage);

  const isFirstPage = page === firstPage;
  const isLastPage = page === lastPage;

  const changeContentsLengthPerPage = (value: number) => {
    setContentsLengthPerPage(value);
  };

  const goToPage = (n: number) => {
    if (n > 0 && n <= lastPage) {
      setPage(n);
    }
  };

  const goToFirstPage = () => goToPage(1);

  const goToPrevPage = () => goToPage(page - 1);

  const goToNextPage = () => goToPage(page + 1);

  const goToLastPage = () => goToPage(lastPage);

  return {
    currentPage: page,
    lastPage,

    contentsLengthPerPage,
    changeContentsLengthPerPage,

    isFirstPage,
    isLastPage,

    goToFirstPage,
    goToPrevPage,
    goToNextPage,
    goToLastPage,
  };
};

export default usePagination;

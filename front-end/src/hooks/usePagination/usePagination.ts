import { useState } from "react";

interface UsePaginationProps {
  count: number;
  totalContentsLength: number;
}

const usePagination = ({ count, totalContentsLength }: UsePaginationProps) => {
  const [page, setPage] = useState(1);
  const [contentsLengthPerPage, setContentsLengthPerPage] = useState(count);

  const lastPage = Math.ceil(totalContentsLength / contentsLengthPerPage);

  const isFirstPage = page === 1;
  const isLastPage = page === lastPage;

  const onChangeContentsLengthPerPage = (value: number) => {
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
    onChangeContentsLengthPerPage,

    isFirstPage,
    isLastPage,

    goToFirstPage,
    goToPrevPage,
    goToNextPage,
    goToLastPage,
  };
};

export default usePagination;

import { useState } from "react";

interface UsePaginationProps {
  count: number;
  totalContentsLength: number;
}

const usePagination = ({ count = 10, totalContentsLength }: UsePaginationProps) => {
  const [page, setPage] = useState(1);
  const [contentsLengthPerPage, setContentsLengthPerPage] = useState(count);

  const lastPage = Math.ceil(totalContentsLength / contentsLengthPerPage);

  const isFirstPage = page === 1;
  const isLastPage = page === lastPage;

  const onChangeContentsLengthPerPage = (value: number) => {
    setContentsLengthPerPage(value);
  };

  const goFirstPage = () => setPage(1);

  const goPrevPage = () => {
    if (isFirstPage) return;
    setPage((prev) => prev - 1);
  };

  const goNextPage = () => {
    if (isLastPage) return;
    setPage((prev) => prev + 1);
  };

  const goLastPage = () => setPage(lastPage);

  return {
    currentPage: page,
    contentsLengthPerPage,
    onChangeContentsLengthPerPage,

    pageInfo: {
      lastPage,
      isFirstPage,
      isLastPage,
    },

    goFirstPage,
    goPrevPage,
    goNextPage,
    goLastPage,
  };
};

export default usePagination;

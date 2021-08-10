interface PaginationProps {
  currentPage: number;
  pageRowCount: number;
  totalRowCount: number;
  onPageClick: (num: number) => void;
}

const Pagination = ({ currentPage, pageRowCount, totalRowCount, onPageClick }: PaginationProps) => {
  const firstPage = 1;
  const lastPage = Math.ceil(totalRowCount / pageRowCount);

  const goNextPage = () => {
    if (currentPage === lastPage) return;
    onPageClick(1);
  };
  const goPrevPage = () => {
    if (currentPage === firstPage) return;
    onPageClick(-1);
  };
  const goFirstPage = () => onPageClick(-currentPage + 1);
  const goLastPage = () => onPageClick(Math.ceil(totalRowCount / pageRowCount) - currentPage);

  return (
    <div>
      <button
        style={{
          width: "50px",
          height: "25px",
          backgroundColor: `var(--primary-50)`,
          borderRadius: "16px",
          fontWeight: "bold",
        }}
        onClick={goFirstPage}
        disabled={currentPage === firstPage}
      >
        {"<<"}
      </button>
      <span>|</span>
      <button
        style={{
          width: "50px",
          height: "25px",
          backgroundColor: `var(--primary-50)`,
          borderRadius: "16px",
          fontWeight: "bold",
        }}
        onClick={goPrevPage}
        disabled={currentPage === firstPage}
      >
        {"<"}
      </button>
      <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
        {(currentPage - 1) * pageRowCount + 1}
      </span>
      <span style={{ fontWeight: "bold", fontSize: "1rem" }}>~</span>
      <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
        {currentPage * pageRowCount > totalRowCount ? totalRowCount : currentPage * pageRowCount}
      </span>
      <button
        style={{
          width: "50px",
          height: "25px",
          backgroundColor: `var(--primary-50)`,
          borderRadius: "16px",
          fontWeight: "bold",
        }}
        onClick={goNextPage}
        disabled={currentPage === lastPage}
      >
        {">"}
      </button>
      <span>|</span>
      <button
        style={{
          width: "50px",
          height: "25px",
          backgroundColor: `var(--primary-50)`,
          borderRadius: "16px",
          fontWeight: "bold",
        }}
        onClick={goLastPage}
        disabled={currentPage === lastPage}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;

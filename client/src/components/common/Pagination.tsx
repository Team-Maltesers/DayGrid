import React from "react";
import Prev from "../../assets/image/prev.png";
import Next from "../../assets/image/next.png";
import classes from "../../styles/common/Pagination.module.css";
interface paginationProp {
  onPrevPage: () => void;
  onNextPage: () => void;
  totalPages: number;
  currentPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, pageNumber: number) => void;
}

const Pagination = ({
  onPrevPage,
  onNextPage,
  currentPage,
  totalPages,
  onPageChange,
}: paginationProp) => {
  const firstVisiblePage = Math.max(currentPage - 2, 1);
  const lastVisiblePage = Math.min(firstVisiblePage + 4, totalPages);

  const visiblePageNumbers = Array.from(
    { length: lastVisiblePage - firstVisiblePage + 1 },
    (_, index) => firstVisiblePage + index,
  );

  return (
    <div className={classes.pagination}>
      <button onClick={onPrevPage} className={currentPage === 1 ? "disabled" : ""}>
        <img src={Prev} alt="이전 페이지" />
      </button>
      {visiblePageNumbers.length === 0 ? (
        <button className={classes.clicked}>1</button>
      ) : (
        visiblePageNumbers.map((pageNumber) => (
          <button
            className={currentPage === pageNumber ? classes.clicked : ""}
            key={pageNumber}
            onClick={(event) => onPageChange(event, pageNumber)}
          >
            {pageNumber}
          </button>
        ))
      )}
      {totalPages > 0 && (
        <button onClick={onNextPage} className={currentPage === totalPages ? "disabled" : ""}>
          <img src={Next} alt="다음 페이지" />
        </button>
      )}
    </div>
  );
};

export default Pagination;

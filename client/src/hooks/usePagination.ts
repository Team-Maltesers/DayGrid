import { useCallback, useState } from "react";

export interface PaginationReturn {
  currentPage: number;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  onPageChangeHandler: (event: React.MouseEvent<HTMLButtonElement>, pageNumber: number) => void;
  onPrevPageHandler: () => void;
  onNextPageHandler: () => void;
}

export const usePagination = (): PaginationReturn => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const onPageChangeHandler = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, pageNumber: number) => {
      if (pageNumber === currentPage) {
        event.preventDefault();
        return;
      }
      setCurrentPage(pageNumber);
    },
    [currentPage],
  );

  const onPrevPageHandler = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const onNextPageHandler = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  return {
    currentPage,
    totalPages,
    setTotalPages,
    onPageChangeHandler,
    onPrevPageHandler,
    onNextPageHandler,
  };
};

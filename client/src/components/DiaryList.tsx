import React, { useEffect } from "react";
import classes from "../styles/DiaryList.module.css";
import { useQuery } from "@tanstack/react-query";
import { usePagination } from "../hooks/usePagination";
import { fetchDiaryList } from "../utils/http";
import DiaryItem from "./DiaryItem";
import Pagination from "./common/Pagination";
interface DiaryListData {
  data: DiaryDataType[];
  total_pages: number;
  current_page: number;
}
interface DiaryDataType {
  diaryId: number;
  title: string;
  createdAt: string;
  content: string;
  hasImage: boolean;
}
const DiaryList: React.FC = () => {
  const {
    currentPage,
    totalPages,
    setTotalPages,
    onPageChangeHandler,
    onPrevPageHandler,
    onNextPageHandler,
  } = usePagination();

  const { data: diaryListData, isLoading } = useQuery<DiaryListData>({
    queryKey: ["diarylist", currentPage],
    queryFn: ({ signal }) => fetchDiaryList({ signal, page: currentPage }),
  });
  useEffect(() => {
    if (diaryListData) {
      setTotalPages(diaryListData.total_pages);
    }
  }, [diaryListData]);
  return (
    <div className={classes["diary-list"]}>
      <h1 className={classes["diary-list__title"]}>다이어리</h1>
      <div className={classes["diary-list__header"]}>
        <div className={classes["diary-list__header-title"]}>제목</div>
        <div className={classes["diary-list__header-date"]}>날짜</div>
      </div>
      {isLoading && <div className={classes["diary-list__loading"]}>Loading...</div>}
      {!isLoading &&
        diaryListData &&
        diaryListData.data.map((diary) => <DiaryItem key={diary.diaryId} data={diary} />)}
      {!isLoading && diaryListData?.data.length === 0 && (
        <div className={classes["diary-list__blank"]}>
          아직 작성된 다이어리가 없어요. 첫 기록을 시작해보세요! ✏️
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        onPrevPage={onPrevPageHandler}
        totalPages={totalPages}
        onPageChange={onPageChangeHandler}
        onNextPage={onNextPageHandler}
      />
    </div>
  );
};

export default DiaryList;

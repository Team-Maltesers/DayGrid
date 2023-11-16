import React from "react";
import classes from "../styles/DiaryData.module.css";

interface DiaryDataFormData {
  date: string;
  title: string;
  content: string;
}

interface DiaryDataProps {
  diaryData: DiaryDataFormData; // 서버에서 받아온 데이터
  onDelete: () => void; // 삭제 버튼 클릭 시 실행할 함수
  onEdit: () => void; // 수정 버튼 클릭 시 실행할 함수
}

const DiaryData: React.FC<DiaryDataProps> = ({ diaryData, onDelete, onEdit }) => {
  const { date, title, content } = diaryData; // 서버에서 받아온 데이터를 분해 할당

  return (
    <article className={classes.diary__data}>
      <h2 className={classes.diary__title}>{title}</h2>
      <div className={classes.diary__line}></div>
      <div className={classes.diary__metadata}>
        <div className={classes.diary__date}>{date}</div>
        <div>
          <button className={classes.diary__edit} onClick={onEdit}></button>
          <button className={classes.diary__delete} onClick={onDelete}></button>
        </div>
      </div>{" "}
      <div className={classes.diary__line}></div>
      <div className={classes.diary__content}>{content}</div>
    </article>
  );
};

export default DiaryData;

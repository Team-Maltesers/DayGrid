import React from "react";
import classes from "../styles/DiaryData.module.css";
import { getFormattedDate } from "../utils/time";

interface DiaryDataFormData {
  createdAt: string;
  title: string;
  content: string;
}

interface DiaryDataProps {
  diaryData: DiaryDataFormData;
  onDelete: () => void;
  onEdit: () => void;
}

const DiaryData: React.FC<DiaryDataProps> = ({ diaryData, onDelete, onEdit }) => {
  const { createdAt, title, content } = diaryData;

  return (
    <article className={classes.diary__data}>
      <h2 className={classes.diary__title}>{title}</h2>
      <div className={classes.diary__line}></div>
      <div className={classes.diary__metadata}>
        <div className={classes.diary__date}>{getFormattedDate(createdAt)}</div>
        <div>
          <button className={classes.diary__edit} onClick={onEdit}></button>
          <button className={classes.diary__delete} onClick={onDelete}></button>
        </div>
      </div>{" "}
      <div className={classes.diary__line}></div>
      <div className={classes.diary__content} dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default DiaryData;

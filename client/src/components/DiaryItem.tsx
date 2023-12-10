import React from "react";
import classes from "../styles/DiaryItem.module.css";
import { useDispatch } from "react-redux";
import { openModal } from "../store/modal/modalSlice";
import { diaryId } from "../store/diary/diarySlice";
import hasImg from "../assets/image/hasImage.png";
import noImg from "../assets/image/noImage.png";
import { getFormattedDate } from "../utils/time";
interface DiaryProps {
  data: {
    diaryId: number;
    title: string;
    createdAt: string;
    content: string;
    hasImage: boolean;
  };
}

const DiaryItem: React.FC<DiaryProps> = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <article className={classes["diary-item"]} key={data.diaryId}>
      <input className={classes["diary-item__checkbox"]} type="checkbox" name="" id="" />
      <div className={classes["diary-item__img"]}>
        {data.hasImage ? <img src={hasImg} /> : <img src={noImg} />}
      </div>
      <div
        className={classes["diary-item__title"]}
        onClick={() => {
          dispatch(diaryId(data.diaryId));
          dispatch(openModal("diarydetail"));
          return;
        }}
      >
        {data.title}
      </div>
      <div className={classes["diary-item__date"]}>
        {getFormattedDate(data.createdAt).split(" ")[0]}
      </div>
    </article>
  );
};

export default React.memo(DiaryItem);

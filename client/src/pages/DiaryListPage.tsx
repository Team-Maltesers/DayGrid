import React from "react";
import DiaryData from "../components/DiaryList";
import classes from "../styles/DiaryListPage.module.css";
import DiaryGallery from "../components/DiaryGallery";
import plus from "../assets/image/plus.png";
import { useNavigate } from "react-router-dom";

function DiaryListPage() {
  const navigate = useNavigate();
  return (
    <div className={classes.diaryListPage__bg}>
      <div className={classes.diaryData}>
        <DiaryData></DiaryData>
      </div>
      <div className={classes.diaryListPage__line}></div>
      <div className={classes.diaryGallery}>
        <DiaryGallery></DiaryGallery>
      </div>
      <div className={classes.diaryListPage__add_btn} onClick={() => navigate("/diary-write")}>
        <img src={plus} />
      </div>
    </div>
  );
}

export default DiaryListPage;

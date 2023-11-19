import React from "react";
import DiaryData from "../components/DiaryList";
import classes from "../styles/DiaryListPage.module.css";
import DiaryGallery from "../components/DiaryGallery";

function DiaryListPage() {
  return (
    <div className={classes.diaryListPage__bg}>
      <div className={classes.diaryData}>
        <DiaryData></DiaryData>
      </div>
      <div className={classes.diaryGallery}>
        <DiaryGallery></DiaryGallery>
      </div>
    </div>
  );
}

export default DiaryListPage;

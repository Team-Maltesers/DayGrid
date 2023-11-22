import React from "react";
import classes from "../styles/DiaryWritePage.module.css";
import DiaryWrite from "../components/DiaryWrite";

function DiaryWritePage() {
  return (
    <div className={classes.diaryWritePage__bg}>
      <DiaryWrite></DiaryWrite>
    </div>
  );
}

export default DiaryWritePage;

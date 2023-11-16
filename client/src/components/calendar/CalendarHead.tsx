import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  moveToPrevMonth,
  moveToNextMonth,
  moveToToday,
  currentDateState,
} from "../../store/modal/calendarSlice";
import classes from "../../styles/calendar/Calendar.module.css";
import leftArrow from "../../assets/image/arrow-left.png";
import rightArrow from "../../assets/image/arrow-right.png";

const CalendarHead = (): JSX.Element => {
  const currentDate = useSelector(currentDateState);
  const dispatch = useDispatch();

  function handlePrevMonthBtn() {
    dispatch(moveToPrevMonth());
  }

  function handleNextMonthBtn() {
    dispatch(moveToNextMonth());
  }

  function handleTodayBtn() {
    dispatch(moveToToday());
  }

  return (
    <div className={classes.calendar__head_con}>
      <div className={classes.calendar__head_left}>
        <div>
          <img src={leftArrow} onClick={handlePrevMonthBtn} />
          <img src={rightArrow} onClick={handleNextMonthBtn} />
        </div>
        <div>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </div>
      </div>
      <div className={classes.calendar__head_right}>
        <div className={classes.calendar__head_today} onClick={handleTodayBtn}>
          오늘
        </div>
        <select className={classes.calendar__head_format}>
          <option>월</option>
          <option>주</option>
        </select>
      </div>
    </div>
  );
};

export default CalendarHead;

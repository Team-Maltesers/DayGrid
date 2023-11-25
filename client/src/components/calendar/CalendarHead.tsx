import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrentDate,
  changeCalendarType,
  currentDateState,
  calendarTypeState,
} from "../../store/modal/calendarSlice";
import classes from "../../styles/calendar/Calendar.module.css";
import { addMonths, subMonths, addWeeks, subWeeks } from "date-fns";
import leftArrow from "../../assets/image/arrow-left.png";
import rightArrow from "../../assets/image/arrow-right.png";

function CalendarHead(): JSX.Element {
  const currentDate = new Date(useSelector(currentDateState));
  const calendarType = useSelector(calendarTypeState);
  const dispatch = useDispatch();

  function handlePrevMonthBtn() {
    let newDate;
    if (calendarType === "월") {
      newDate = subMonths(currentDate, 1);
    } else {
      newDate = subWeeks(currentDate, 1);
    }

    dispatch(changeCurrentDate(newDate.toISOString()));
  }

  function handleNextMonthBtn() {
    let newDate;
    if (calendarType === "월") {
      newDate = addMonths(currentDate, 1);
    } else {
      newDate = addWeeks(currentDate, 1);
    }

    dispatch(changeCurrentDate(newDate.toISOString()));
  }

  function handleTodayBtn() {
    dispatch(changeCurrentDate(new Date().toISOString()));
  }

  function handleCalendarTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(changeCalendarType(e.target.value));
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
        <select
          className={classes.calendar__head_format}
          value={calendarType}
          onChange={(e) => handleCalendarTypeChange(e)}
        >
          <option value="월">월</option>
          <option value="주">주</option>
        </select>
      </div>
    </div>
  );
}

export default CalendarHead;

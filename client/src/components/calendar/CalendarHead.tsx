import React, { useState } from "react";
import { subMonths, addMonths } from "date-fns";
import classes from "../../styles/calendar/Calendar.module.css";
import leftArrow from "../../assets/image/arrow-left.png";
import rightArrow from "../../assets/image/arrow-right.png";

const CalendarHead = (): JSX.Element => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  function moveToPrevMonth() {
    setCurrentMonth(subMonths(currentMonth, 1));
  }

  function moveToNextMonth() {
    console.log(currentMonth);
    setCurrentMonth(addMonths(currentMonth, 1));
  }

  return (
    <div className={classes.calendar__head_con}>
      <div className={classes.calendar__head_left}>
        <div>
          <img src={leftArrow} onClick={moveToPrevMonth} />
          <img src={rightArrow} onClick={moveToNextMonth} />
        </div>
        <div>
          {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
        </div>
      </div>
      <div className={classes.calendar__head_right}>
        <div className={classes.calendar__head_today}>오늘</div>
        <select className={classes.calendar__head_format}>
          <option>월</option>
          <option>주</option>
        </select>
      </div>
    </div>
  );
};

export default CalendarHead;

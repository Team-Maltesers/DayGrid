import React, { useState } from "react";
import classes from "../../styles/calendar/Calendar.module.css";
import leftArrow from "../../assets/image/arrow-left.png";
import rightArrow from "../../assets/image/arrow-right.png";

const CalendarHead = (): JSX.Element => {
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);

  return (
    <div className={classes.calendar__head_con}>
      <div className={classes.calendar__head_left}>
        <div>
          <img src={leftArrow} />
          <img src={rightArrow} />
        </div>
        <div>
          {currentYear}년 {currentMonth}월
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

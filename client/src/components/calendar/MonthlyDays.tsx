import React from "react";
import classes from "../../styles/calendar/MonthlyCalendar.module.css";

const MonthlyDays = (): JSX.Element => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className={classes.monthly__days}>
      {days.map((el, idx) => {
        return (
          <div key={idx} className={classes.monthly__days_cell}>
            {el}
          </div>
        );
      })}
    </div>
  );
};

export default MonthlyDays;

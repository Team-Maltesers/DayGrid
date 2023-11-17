import React from "react";
import MonthlyDays from "./MonthlyDays";
import MonthlyBody from "./MonthlyBody";
import classes from "../../styles/calendar/MonthlyCalendar.module.css";

function MonthlyCalendar(): JSX.Element {
  return (
    <div className={classes.monthly__con}>
      <MonthlyDays />
      <MonthlyBody />
    </div>
  );
}

export default MonthlyCalendar;

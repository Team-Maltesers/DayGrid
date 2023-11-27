import React from "react";
import MonthlyDays from "./MonthlyDays";
import MonthlyBody from "./MonthlyBody";
import classes from "../../styles/calendar/MonthlyCalendar.module.css";
import { CalendarProps } from "../../ts/PlanData";

function MonthlyCalendar({ planData }: CalendarProps): JSX.Element {
  return (
    <div className={classes.monthly__con}>
      <MonthlyDays />
      <MonthlyBody planData={planData} />
    </div>
  );
}

export default MonthlyCalendar;

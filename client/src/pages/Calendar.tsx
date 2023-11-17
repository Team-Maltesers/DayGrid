import React from "react";
import classes from "../styles/calendar/Calendar.module.css";
import MiniCalendar from "../components/calendar/MiniCalendar";
import DdayList from "../components/calendar/DdayList";
import CalendarHead from "../components/calendar/CalendarHead";
import MonthlyCalendar from "../components/calendar/MonthlyCalendar";

function Calendar() {
  return (
    <div className={classes.calendar__bg}>
      <div className={classes.calendar__con}>
        <div className={classes.calendar__side}>
          <MiniCalendar />
          <DdayList />
        </div>
        <div className={classes.calendar__main}>
          <CalendarHead />
          <MonthlyCalendar />
        </div>
      </div>
    </div>
  );
}

export default Calendar;

import React from "react";
import classes from "../styles/calendar/Calendar.module.css";
import MiniCalendar from "../components/calendar/MiniCalendar";
import DdayList from "../components/calendar/DdayList";
import CalendarHead from "../components/calendar/CalendarHead";
import MonthlyCalendar from "../components/calendar/MonthlyCalendar";
import WeeklyCalendar from "../components/calendar/WeeklyCalendar";

function Calendar(): JSX.Element {
  return (
    <div className={classes.calendar__bg} style={{ marginLeft: "500px" }}>
      {/* <div className={classes.calendar__con}>
        <div className={classes.calendar__side}>
          <MiniCalendar />
          <DdayList />
        </div>
        <div className={classes.calendar__main}>
          <CalendarHead />
          <MonthlyCalendar />
        </div>
      </div> */}
      <WeeklyCalendar />
    </div>
  );
}

export default Calendar;

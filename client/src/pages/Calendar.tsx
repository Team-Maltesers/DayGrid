import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { calendarTypeState } from "../store/modal/calendarSlice";
import classes from "../styles/calendar/Calendar.module.css";
import MiniCalendar from "../components/calendar/MiniCalendar";
import DdayList from "../components/calendar/DdayList";
import CalendarHead from "../components/calendar/CalendarHead";
import MonthlyCalendar from "../components/calendar/MonthlyCalendar";
import WeeklyCalendar from "../components/calendar/WeeklyCalendar";
import plus from "../assets/image/plus.png";

function Calendar(): JSX.Element {
  const calendarType = useSelector(calendarTypeState);

  return (
    <div className={classes.calendar__bg}>
      <div className={classes.calendar__con}>
        <div className={classes.calendar__side}>
          <MiniCalendar />
          <DdayList />
        </div>
        <div className={classes.calendar__main}>
          <CalendarHead />
          {calendarType === "월" ? <MonthlyCalendar /> : <WeeklyCalendar />}
          <div className={classes.calendar__add_btn}>
            <img src={plus} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;

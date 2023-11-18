import React from "react";
import { useSelector } from "react-redux";
import { currentDateState } from "../../store/modal/calendarSlice";
import { startOfWeek, endOfWeek, addDays, isSameDay } from "date-fns";
import classes from "../../styles/calendar/WeeklyCalendar.module.css";

function WeeklyHead(): JSX.Element {
  const currentDate = useSelector(currentDateState);
  const weekStart = startOfWeek(currentDate);
  const weekEnd = endOfWeek(currentDate);

  let curDay = weekStart;
  const week = [];

  while (curDay <= weekEnd) {
    const date = curDay.getDate();
    const day = curDay.getDay();
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const style = {
      fontColor: "",
      fontWeight: "",
      background: "",
    };

    if (isSameDay(curDay, new Date())) {
      style.fontColor = "#FFFFFF";
      style.fontWeight = "500";
      style.background = "var(--sub-color)";
    }

    week.push(
      <>
        <div className={classes.weekly__head_day}>{days[day]}</div>
        <div
          className={classes.weekly__head_date}
          style={{
            color: style.fontColor,
            fontWeight: style.fontWeight,
            backgroundColor: style.background,
          }}
        >
          {date}
        </div>
      </>,
    );

    curDay = addDays(curDay, 1);
  }

  return (
    <div className={classes.weekly__head_con}>
      <div className={classes.weekly__head_empty}></div>
      <div className={classes.weekly__head_cell_con}>
        {week.map((day, idx) => (
          <div key={idx} className={classes.weekly__head_cell}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyHead;

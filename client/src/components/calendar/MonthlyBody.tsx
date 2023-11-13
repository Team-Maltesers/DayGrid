import React from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import classes from "../../styles/calendar/MonthlyCalendar.module.css";

const MonthlyBody = (): JSX.Element => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  let curDay = calendarStart;
  let week = [];
  const month = [];
  let key = 0;

  while (curDay <= calendarEnd) {
    const day = curDay.getDate();
    const style = {
      fontColor: "",
      fontWeight: "",
      background: "",
      width: "",
      height: "",
      borderRadius: "",
    };

    if (!isSameMonth(curDay, monthStart)) {
      style.fontColor = "var(--font-color-gray)";
    } else if (isSameDay(curDay, today)) {
      style.fontColor = "#FFFFFF";
      style.fontWeight = "500";
      style.background = "var(--sub-color)";
    }

    week.push(
      <div key={key} className={classes.monthly__body_cell}>
        <div
          style={{
            color: style.fontColor,
            fontWeight: style.fontWeight,
            backgroundColor: style.background,
          }}
        >
          {day}
        </div>
      </div>,
    );

    if (week.length === 7) {
      month.push(week);
      week = [];
    }

    curDay = addDays(curDay, 1);
    key++;
  }

  return (
    <div className={classes.monthly__body}>
      {month.map((week, idx) => (
        <div className={classes.monthly__body_row} key={idx}>
          {week}
        </div>
      ))}
    </div>
  );
};

export default MonthlyBody;

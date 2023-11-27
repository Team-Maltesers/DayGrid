import React from "react";
import { useSelector } from "react-redux";
import { currentDateState } from "../../store/modal/calendarSlice";
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
import MonthlyPlanCard from "./MonthlyPlanCard";
import { CalendarProps } from "../../ts/PlanData";

function MonthlyBody({ planData }: CalendarProps): JSX.Element {
  const currentDate = new Date(useSelector(currentDateState));
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  let curDay = calendarStart;
  let week = [];
  const month = [];
  let key = 0;

  while (curDay <= calendarEnd) {
    const newPlanData = planData.filter((v) => isSameDay(curDay, new Date(v.date)));
    const day = curDay.getDate();
    const style = {
      fontColor: "",
      fontWeight: "",
      background: "",
    };

    if (!isSameMonth(curDay, monthStart)) {
      style.fontColor = "var(--font-color-gray)";
    } else if (isSameDay(curDay, new Date())) {
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
          className={classes.monthly__body_cell_number}
        >
          {day}
        </div>
        {newPlanData.length < 4 ? (
          newPlanData.map((v, i) => (
            <MonthlyPlanCard id={v.planId} planTitle={v.title} color={v.color} key={i} />
          ))
        ) : (
          <>
            <MonthlyPlanCard
              planTitle={newPlanData[0].title}
              id={newPlanData[0].planId}
              color={newPlanData[0].color}
              key="1"
            />
            <MonthlyPlanCard
              planTitle={newPlanData[1].title}
              id={newPlanData[1].planId}
              color={newPlanData[1].color}
              key="2"
            />
            <MonthlyPlanCard
              planTitle={`+${newPlanData.length - 2} 일정`}
              curDay={curDay}
              moveToWeekly={true}
              key="3"
            />
          </>
        )}
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
}

export default MonthlyBody;

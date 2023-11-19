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

const dummy = [
  {
    start: new Date(2023, 11, 2, 17, 28, 0),
    end: new Date(2023, 11, 2, 20, 12, 0),
    title: "테스트 일정1",
    color: "lightcoral",
  },
  {
    start: new Date(2023, 11, 2, 17, 28, 0),
    end: new Date(2023, 11, 2, 20, 12, 0),
    title: "테스트 일정1",
    color: "lightcoral",
  },
  {
    start: new Date(2023, 11, 2, 17, 28, 0),
    end: new Date(2023, 11, 2, 20, 12, 0),
    title: "테스트 일정1",
    color: "lightcoral",
  },
  {
    start: new Date(2023, 11, 2, 17, 28, 0),
    end: new Date(2023, 11, 2, 20, 12, 0),
    title: "테스트 일정1",
    color: "lightcoral",
  },
  {
    start: new Date(2023, 11, 16, 14, 24, 0),
    end: new Date(2023, 11, 16, 16, 51, 0),
    title: "테스트 일정2",
    color: "lightcoral",
  },
];

function MonthlyBody(): JSX.Element {
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
    const newDummy = dummy.filter((v) => isSameDay(curDay, v.start));
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
        {newDummy.length < 4 ? (
          newDummy.map((v) => <MonthlyPlanCard planTitle={v.title} color={v.color} />)
        ) : (
          <>
            <MonthlyPlanCard planTitle={dummy[0].title} color={dummy[0].color} />
            <MonthlyPlanCard planTitle={dummy[1].title} color={dummy[1].color} />
            <MonthlyPlanCard planTitle={`+${dummy.length - 2} 일정`} />
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

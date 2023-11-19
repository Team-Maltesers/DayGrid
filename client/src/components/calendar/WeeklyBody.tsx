import React from "react";
import { isSameWeek } from "date-fns";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { currentDateState } from "../../store/modal/calendarSlice";
import classes from "../../styles/calendar/WeeklyCalendar.module.css";

const dummy = [
  {
    start: new Date(2023, 10, 2, 17, 28, 0),
    end: new Date(2023, 10, 2, 20, 12, 0),
    title: "테스트 일정1",
    color: "lightcoral",
  },
  {
    start: new Date(2023, 10, 16, 14, 24, 0),
    end: new Date(2023, 10, 16, 16, 51, 0),
    title: "테스트 일정2",
    color: "lightcoral",
  },
];

function WeeklyBody(): JSX.Element {
  const currentDate = new Date(useSelector(currentDateState));

  function time(): string[] {
    const timeArr = [];
    for (let i = 1; i < 24; i++) {
      if (i <= 12) {
        timeArr.push(`오전 ${i}시`);
      } else {
        timeArr.push(`오후 ${i - 12}시`);
      }
    }
    return timeArr;
  }
  const gridItemArr = Array.from({ length: 168 }, (_, i) => i + 1);

  const newDummy = [];
  for (let i = 0; i < dummy.length; i++) {
    const top = `${dummy[i].start.getHours() * 60 + dummy[i].start.getMinutes()}px`;
    const left = `${dummy[i].start.getDay() * 194.9}px`;
    const height = `${(dummy[i].end.getTime() - dummy[i].start.getTime()) / 1000 / 60}px`;
    newDummy.push({ ...dummy[i], top: top, left: left, height: height });
  }

  return (
    <div className={classes.weekly__body_con}>
      <div className={classes.weekly__body_side}>
        {time().map((h, i) => (
          <div className={classes.weekly__body_time_section} key={i}>
            <div className={classes.weekly__body_time}>{h}</div>
            <div className={classes.weekly__body_time_line}></div>
          </div>
        ))}
      </div>
      <div className={classes.weekly__body_planner}>
        {gridItemArr.map((v) => (
          <div className={classes.weekly__body_planner_grid} key={v}></div>
        ))}
        {newDummy.map((v) =>
          isSameWeek(v.start, currentDate) ? (
            <div
              className={classes.weekly__body_plan}
              style={{
                top: v.top,
                left: v.left,
                height: v.height,
                backgroundColor: v.color,
              }}
            >
              {v.title}
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}

export default WeeklyBody;

import React from "react";
import { isSameWeek } from "date-fns";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { currentDateState } from "../../store/modal/calendarSlice";
import classes from "../../styles/calendar/WeeklyCalendar.module.css";
import dummy from "../../assets/dummy";

interface ArrangeTime {
  [key: string]: number;
}

interface ArrangeBoxes {
  [key: string]: ArrangeTime;
}

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
  const arrangeBoxes: ArrangeBoxes = {
    "0": {},
    "1": {},
    "2": {},
    "3": {},
    "4": {},
    "5": {},
    "6": {},
  };
  for (let i = 0; i < dummy.length; i++) {
    const top = `${dummy[i].start.getHours() * 60 + dummy[i].start.getMinutes()}px`;
    const height = `${(dummy[i].end.getTime() - dummy[i].start.getTime()) / 1000 / 60}px`;

    const today = dummy[i].start.getDay().toString();
    const hour = dummy[i].start.getHours().toString();
    arrangeBoxes[today][hour] ? arrangeBoxes[today][hour]++ : (arrangeBoxes[today][hour] = 1);

    const width = `${193 / arrangeBoxes[today][hour]}px`;
    let left = `${dummy[i].start.getDay() * 194.9}px`;
    let index = 2;

    if (dummy[i].end.getHours() - dummy[i].start.getHours() > 3) {
      index = 1;
    }
    if (dummy[i].end.getHours() - dummy[i].start.getHours() > 5) {
      index = 0;
    }

    if (arrangeBoxes[today][hour] > 1) {
      left = `${
        dummy[i].start.getDay() * 194.9 +
        (193 / arrangeBoxes[today][hour]) * (arrangeBoxes[today][hour] - 1)
      }px`;
      index += arrangeBoxes[today][hour];
    }

    newDummy.push({
      ...dummy[i],
      top: top,
      left: left,
      height: height,
      width: width,
      index: index,
    });
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
                width: v.width,
                zIndex: v.index,
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

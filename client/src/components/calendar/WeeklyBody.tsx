import React from "react";
import classes from "../../styles/calendar/WeeklyCalendar.module.css";

function WeeklyBody(): JSX.Element {
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

  return (
    <div className={classes.weekly__body_con}>
      <div className={classes.weekly__body_side}>
        {time().map((h) => (
          <div className={classes.weekly__body_time_section}>
            <div className={classes.weekly__body_time}>{h}</div>
            <div className={classes.weekly__body_time_line}></div>
          </div>
        ))}
      </div>
      <table className={classes.weekly__body_planner}>
        {gridItemArr.map((v) => (
          <div className={classes.weekly__body_planner_grid} key={v}></div>
        ))}
      </table>
    </div>
  );
}

export default WeeklyBody;

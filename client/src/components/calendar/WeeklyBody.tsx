import React from "react";
import { isSameWeek } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/modal/modalSlice";
import {
  currentDateState,
  changeClickedTime,
  selectedPlanId,
} from "../../store/modal/calendarSlice";
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
  const dispatch = useDispatch();

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

  function handleModalOpen(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    if (target.dataset.day && target.dataset.hour) {
      dispatch(changeClickedTime([1, +target.dataset.day, +target.dataset.hour]));
    }

    dispatch(openModal("planWrite"));
  }

  const weekCellArr = [];
  for (let i = 0; i < 7; i++) {
    const tmp = [];
    for (let j = 0; j < 24; j++) {
      tmp.push(<div key={j} data-day={i} data-hour={j} onClick={(e) => handleModalOpen(e)}></div>);
    }
    weekCellArr.push(tmp);
  }

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
    const top = `${dummy[i].startTime[1] * 15}px`;
    const height = `${(dummy[i].endTime[1] - dummy[i].startTime[1]) * 15}px`;

    const today = new Date(dummy[i].date).getDay().toString();
    const hour = dummy[i].startTime[1];
    arrangeBoxes[today][hour] ? arrangeBoxes[today][hour]++ : (arrangeBoxes[today][hour] = 1);

    const width = `${193 / arrangeBoxes[today][hour]}px`;
    let left = `${new Date(dummy[i].date).getDay() * 194.9}px`;
    let index = 96 - (dummy[i].endTime[1] - dummy[i].startTime[1]);

    if (arrangeBoxes[today][hour] > 1) {
      left = `${
        new Date(dummy[i].date).getDay() * 194.9 +
        (193 / arrangeBoxes[today][hour]) * (arrangeBoxes[today][hour] - 1)
      }px`;
      index = 96 - (dummy[i - 1].endTime[1] - dummy[i - 1].startTime[1]) + 1;
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
        {weekCellArr.map((v, i) => (
          <div className={classes.weekly__body_planner_flex} key={i}>
            {v}
          </div>
        ))}
        {newDummy.map((v, i) =>
          isSameWeek(new Date(v.date), currentDate) ? (
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
              key={i}
              onClick={() => {
                dispatch(selectedPlanId(v.id));
                dispatch(openModal("planCheck"));
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

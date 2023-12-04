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
import { CalendarProps } from "../../ts/PlanData";

interface ArrangeTime {
  [key: string]: number;
}

interface ArrangeBoxes {
  [key: string]: ArrangeTime;
}

function WeeklyBody({ planData }: CalendarProps): JSX.Element {
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

  const newPlanData = [];
  const arrangeBoxes: ArrangeBoxes = {
    "0": {},
    "1": {},
    "2": {},
    "3": {},
    "4": {},
    "5": {},
    "6": {},
  };
  for (let i = 0; i < planData.length; i++) {
    const top = `${planData[i].startTime * 15}px`;
    const height = `${(planData[i].endTime - planData[i].startTime) * 15}px`;

    const today = new Date(planData[i].date).getDay().toString();
    const hour = planData[i].startTime;
    arrangeBoxes[today][hour] ? arrangeBoxes[today][hour]++ : (arrangeBoxes[today][hour] = 1);

    const width = `${193 / arrangeBoxes[today][hour]}px`;
    let left = `${new Date(planData[i].date).getDay() * 194.9}px`;
    let index = 96 - (planData[i].endTime - planData[i].startTime);

    if (arrangeBoxes[today][hour] > 1) {
      left = `${
        new Date(planData[i].date).getDay() * 194.9 +
        (193 / arrangeBoxes[today][hour]) * (arrangeBoxes[today][hour] - 1)
      }px`;
      index = 96 - (planData[i - 1].endTime - planData[i - 1].startTime) + 1;
    }

    newPlanData.push({
      ...planData[i],
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
        {newPlanData.map((v, i) =>
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
                dispatch(selectedPlanId(v.planId));
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

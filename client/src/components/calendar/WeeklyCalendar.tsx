import React from "react";
import WeeklyHead from "./WeeklyHead";
import WeeklyBody from "./WeeklyBody";
import { CalendarProps } from "../../ts/PlanData";

function WeeklyCalendar({ planData }: CalendarProps): JSX.Element {
  return (
    <div>
      <WeeklyHead />
      <WeeklyBody planData={planData} />
    </div>
  );
}

export default WeeklyCalendar;

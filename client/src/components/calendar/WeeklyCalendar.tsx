import React from "react";
import WeeklyHead from "./WeeklyHead";
import WeeklyBody from "./WeeklyBody";

function WeeklyCalendar(): JSX.Element {
  return (
    <div>
      <WeeklyHead />
      <WeeklyBody />
    </div>
  );
}

export default WeeklyCalendar;

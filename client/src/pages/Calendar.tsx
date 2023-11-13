import React from "react";
import CalendarHead from "../components/calendar/CalendarHead";
import MonthlyCalendar from "../components/calendar/MonthlyCalendar";

function Calendar() {
  return (
    <div style={{ padding: "200px" }}>
      <CalendarHead />
      <MonthlyCalendar />
    </div>
  );
}

export default Calendar;

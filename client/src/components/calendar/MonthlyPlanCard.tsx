import React from "react";
import classes from "../../styles/calendar/MonthlyCalendar.module.css";

interface PlanCardProps {
  planTitle: string;
  color?: string;
}

function MonthlyPlanCard({ planTitle, color }: PlanCardProps): JSX.Element {
  return (
    <div className={classes.monthly__plan_card} style={{ backgroundColor: color }}>
      {planTitle}
    </div>
  );
}

export default MonthlyPlanCard;

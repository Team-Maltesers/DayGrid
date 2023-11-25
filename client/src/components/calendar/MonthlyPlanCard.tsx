import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/modal/modalSlice";
import {
  changeCalendarType,
  changeCurrentDate,
  selectedPlanId,
} from "../../store/modal/calendarSlice";
import classes from "../../styles/calendar/MonthlyCalendar.module.css";

interface PlanCardProps {
  planTitle: string;
  id?: number;
  color?: string;
  curDay?: Date;
  moveToWeekly?: boolean;
}

function MonthlyPlanCard({
  planTitle,
  id,
  color,
  curDay,
  moveToWeekly,
}: PlanCardProps): JSX.Element {
  const dispatch = useDispatch();

  function handleOpenPlanCheckModal() {
    if (moveToWeekly) {
      if (curDay) dispatch(changeCurrentDate(curDay?.toISOString()));
      dispatch(changeCalendarType("주"));
    } else {
      if (id) dispatch(selectedPlanId(id));
      dispatch(openModal("planCheck"));
    }
  }

  return (
    <div
      className={classes.monthly__plan_card}
      style={{ backgroundColor: color }}
      onClick={handleOpenPlanCheckModal}
    >
      {planTitle}
    </div>
  );
}

export default MonthlyPlanCard;

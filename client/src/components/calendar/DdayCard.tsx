import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/modal/modalSlice";
import { selectedPlanId } from "../../store/modal/calendarSlice";
import { DdayCardProps } from "../../ts/PlanData";
import classes from "../../styles/calendar/Dday.module.css";

function DdayCard({ data }: DdayCardProps): JSX.Element {
  const dispatch = useDispatch();

  const dday = Math.floor(
    (new Date(data.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  );

  function handleCardClick() {
    dispatch(selectedPlanId(data.planId));
    dispatch(openModal("planCheck"));
  }

  return (
    <div className={classes.dday__card_con} onClick={handleCardClick}>
      <div className={classes.dday__card_top}>
        <div>{`D - ${Math.abs(dday)}`}</div>
      </div>
      <div className={classes.dday__card_bottom}>{data.title}</div>
    </div>
  );
}

export default DdayCard;

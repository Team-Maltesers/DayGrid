import React, { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { calendarTypeState } from "../store/modal/calendarSlice";
import classes from "../styles/calendar/Calendar.module.css";
import MiniCalendar from "../components/calendar/MiniCalendar";
import DdayList from "../components/calendar/DdayList";
import CalendarHead from "../components/calendar/CalendarHead";
import MonthlyCalendar from "../components/calendar/MonthlyCalendar";
import WeeklyCalendar from "../components/calendar/WeeklyCalendar";
import AddPlanModal from "../components/calendar/AddPlanModal";
import PlanWriteModal from "../components/calendar/PlanWriteModal";
import PlanCheckModal from "../components/calendar/PlanCheckModal";
import plus from "../assets/image/plus.png";

function CalendarPage(): JSX.Element {
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState<boolean>(false);
  const calendarType = useSelector(calendarTypeState);

  function handleAddPlanBtnClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setIsAddPlanModalOpen(!isAddPlanModalOpen);
  }

  function handleAddPlanModalClose() {
    if (isAddPlanModalOpen) setIsAddPlanModalOpen(false);
  }

  return (
    <>
      <div className={classes.calendar__bg} onClick={handleAddPlanModalClose}>
        <div className={classes.calendar__con}>
          <div className={classes.calendar__side}>
            <MiniCalendar />
            <DdayList />
          </div>
          <div className={classes.calendar__main}>
            <CalendarHead />
            {calendarType === "월" ? <MonthlyCalendar /> : <WeeklyCalendar />}
            <div className={classes.calendar__add_btn} onClick={(e) => handleAddPlanBtnClick(e)}>
              <img src={plus} />
              <AddPlanModal isAddPlanModalOpen={isAddPlanModalOpen} />
            </div>
          </div>
        </div>
      </div>
      <PlanWriteModal />
      <PlanCheckModal />
    </>
  );
}

export default CalendarPage;

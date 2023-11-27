import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { calendarTypeState, currentDateState } from "../store/modal/calendarSlice";
import { useQuery } from "@tanstack/react-query";
import { fetchPlans } from "../utils/http";
import { FetchPlanData } from "../ts/PlanData";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
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
  const [start, setStart] = useState<Date>(new Date());
  const [end, setEnd] = useState<Date>(new Date());
  const calendarType = useSelector(calendarTypeState);
  const currentDate = new Date(useSelector(currentDateState));

  useEffect(() => {
    const newStart =
      calendarType === "월" ? startOfWeek(startOfMonth(currentDate)) : startOfWeek(currentDate);
    const newEnd =
      calendarType === "월" ? endOfWeek(endOfMonth(currentDate)) : endOfWeek(currentDate);

    if (+newStart !== +start) {
      setStart(newStart);
    }

    if (+newEnd !== +end) {
      setEnd(newEnd);
    }
  }, [calendarType, currentDate]);

  const { data: planData } = useQuery<FetchPlanData[]>({
    queryKey: ["planContent", start, end],
    queryFn: () =>
      fetchPlans({
        start: start,
        end: end,
      }),
  });

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
            {calendarType === "월" ? (
              <MonthlyCalendar planData={planData || []} />
            ) : (
              <WeeklyCalendar planData={planData || []} />
            )}
            <div className={classes.calendar__add_btn} onClick={(e) => handleAddPlanBtnClick(e)}>
              <img src={plus} />
              <AddPlanModal isAddPlanModalOpen={isAddPlanModalOpen} />
            </div>
          </div>
        </div>
      </div>
      <PlanWriteModal />
      <PlanCheckModal planData={planData || []} />
    </>
  );
}

export default CalendarPage;

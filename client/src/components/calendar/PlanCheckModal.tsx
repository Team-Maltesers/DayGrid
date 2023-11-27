import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { planIdState } from "../../store/modal/calendarSlice";
import { closeModal, openModal } from "../../store/modal/modalSlice";
import { changeIsEditing } from "../../store/modal/calendarSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePlan } from "../../utils/http";
import Modal from "../common/Modal";
import createTimeOptions from "../../utils/createTimeOptions";
import classes from "../../styles/calendar/PlanCheckModal.module.css";
import calendarIcon from "../../assets/image/calendar.png";
import { CalendarProps } from "../../ts/PlanData";

function PlanCheckModal({ planData }: CalendarProps): JSX.Element | null {
  const timeOptions = createTimeOptions();
  const isOpen = useSelector((state: RootState) => state.modal.modalType);
  const planId = useSelector(planIdState);
  const data = planData.filter((el) => el.planId === planId);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate } = useMutation({
    mutationFn: deletePlan,
    onSuccess: () => {
      dispatch(closeModal());
      queryClient.invalidateQueries({ queryKey: ["planContent"] });
    },
  });

  if (data.length === 0) {
    return null;
  }

  const planScheduleData = data[0];

  const today = new Date();
  const endDay = new Date(planScheduleData.date);
  const dday = Math.floor((today.getTime() - endDay.getTime()) / (1000 * 60 * 60 * 24));

  if (!(isOpen === "planCheck")) {
    return null;
  }

  function handlePlanEdit() {
    dispatch(
      changeIsEditing([
        true,
        {
          planId: planId,
          title: planScheduleData.title,
          description: planScheduleData.description,
          date: planScheduleData.date,
          startTime: planScheduleData.startTime,
          endTime: planScheduleData.endTime,
          ddayChecked: planScheduleData.ddayChecked,
          color: planScheduleData.color,
        },
      ]),
    );
    dispatch(openModal("planWrite"));
  }

  function handlePlanDelete() {
    if (confirm("정말로 일정을 삭제하시겠습니까?")) {
      mutate({ id: planId });
    }
  }

  return (
    <Modal>
      <div className={classes.plancheck__con}>
        <div className={classes.plancheck__title}>{planScheduleData.title}</div>
        <div className={classes.plancheck__date_con}>
          <img src={calendarIcon} />
          <div className={classes.plancheck__date}>
            {new Date(planScheduleData.date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div>{timeOptions[planScheduleData.startTime].text}</div>
          <span>-</span>
          <div>{timeOptions[planScheduleData.endTime].text}</div>
        </div>
        {planScheduleData.ddayChecked ? (
          <div className={classes.plancheck__dday}>
            {dday > 0 ? `D + ${Math.abs(dday)}` : `D - ${Math.abs(dday)}`}
          </div>
        ) : null}
        <div className={classes.plancheck__desc}>
          {planScheduleData.description === "" ? (
            <div style={{ color: "var(--font-color-gray)" }}>일정에 대한 설명이 없습니다.</div>
          ) : (
            planScheduleData.description
          )}
        </div>
        <div className={classes.plancheck__btn_con}>
          <button onClick={handlePlanEdit}>수정</button>
          <button className={classes.plancheck__warning_btn} onClick={handlePlanDelete}>
            삭제
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default PlanCheckModal;

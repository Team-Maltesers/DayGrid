import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { planIdState } from "../../store/modal/calendarSlice";
import Modal from "../common/Modal";
import createTimeOptions from "../../utils/createTimeOptions";
import classes from "../../styles/calendar/PlanCheckModal.module.css";
import calendarIcon from "../../assets/image/calendar.png";
import dummy from "../../assets/dummy";

function PlanCheckModal(): JSX.Element | null {
  const timeOptions = createTimeOptions();
  const isOpen = useSelector((state: RootState) => state.modal.modalType);
  const planId = useSelector(planIdState);
  const data = dummy.filter((el) => el.id === planId);

  if (data.length === 0) {
    return null;
  }

  const planData = data[0];

  const today = new Date();
  const endDay = new Date(planData.date);
  const dday = Math.floor((today.getTime() - endDay.getTime()) / (1000 * 60 * 60 * 24));

  if (!(isOpen === "planCheck")) {
    return null;
  }

  return (
    <Modal>
      <div className={classes.plancheck__con}>
        <div className={classes.plancheck__title}>{planData.title}</div>
        <div className={classes.plancheck__date_con}>
          <img src={calendarIcon} />
          <div className={classes.plancheck__date}>
            {new Date(planData.date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div>{timeOptions[planData.startTime].text}</div>
          <span>-</span>
          <div>{timeOptions[planData.endTime].text}</div>
        </div>
        {planData.ddayChecked && (
          <div className={classes.plancheck__dday}>
            {dday > 0 ? `D + ${Math.abs(dday)}` : `D - ${Math.abs(dday)}`}
          </div>
        )}
        <div className={classes.plancheck__desc}>{planData.description}</div>
        <div className={classes.plancheck__btn_con}>
          <button>수정</button>
          <button className={classes.plancheck__warning_btn}>삭제</button>
        </div>
      </div>
    </Modal>
  );
}

export default PlanCheckModal;

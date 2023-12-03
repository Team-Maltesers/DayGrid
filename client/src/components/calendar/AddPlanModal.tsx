import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/modal/modalSlice";
import { changeCurrentDate } from "../../store/modal/calendarSlice";
import { changeClickedTime } from "../../store/modal/calendarSlice";
import { Link } from "react-router-dom";
import classes from "../../styles/calendar/Calendar.module.css";

interface AddPlanModalProps {
  isAddPlanModalOpen: boolean;
}

interface ModalStyle {
  opacity: number;
  visibility: string;
}

type Visibility = "visible" | "hidden" | "collapse" | "initial" | "inherit";

function AddPlanModal({ isAddPlanModalOpen }: AddPlanModalProps): JSX.Element {
  const dispatch = useDispatch();
  const [modalStyle, setModalStyle] = useState<ModalStyle>({
    opacity: 0,
    visibility: "hidden",
  });
  const { opacity, visibility } = modalStyle;

  useEffect(() => {
    if (isAddPlanModalOpen) {
      setModalStyle({
        ...modalStyle,
        opacity: 1,
        visibility: "visible",
      });
    } else {
      setModalStyle({
        ...modalStyle,
        opacity: 0,
        visibility: "hidden",
      });
    }
  }, [isAddPlanModalOpen]);

  function handlePlanModalOpen() {
    dispatch(openModal("planWrite"));
    dispatch(changeClickedTime([0, 0, 0]));
    dispatch(changeCurrentDate(new Date().toISOString()));
  }

  return (
    <div
      className={classes.add_plan_modal_con}
      style={{ opacity: opacity, visibility: visibility as Visibility }}
    >
      <div onClick={handlePlanModalOpen}>일정 추가하기</div>
      <Link to="/diary-write">
        <div>다이어리 추가하기</div>
      </Link>
    </div>
  );
}

export default AddPlanModal;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Modal from "../common/Modal";
import PlanWriteModalForm from "./PlanWriteModalForm";
import classes from "../../styles/calendar/PlanWriteModal.module.css";

export default function PlanWriteModal(): JSX.Element | null {
  const [isStartTimeSelected, setIsStartTimeSelected] = useState<boolean>(false);
  const [isEndTimeSelected, setIsEndTimeSelected] = useState<boolean>(false);
  const [isColorOptionOpened, setIsColorOptionOpened] = useState<boolean>(false);

  const isOpen = useSelector((state: RootState) => state.modal.modalType);

  if (!(isOpen === "planWrite")) {
    return null;
  }

  return (
    <div
      onClick={() => {
        setIsStartTimeSelected(false);
        setIsEndTimeSelected(false);
        setIsColorOptionOpened(false);
      }}
    >
      <Modal>
        <div className={classes.planwrite__con}>
          <div className={classes.planwrite__title}>일정 추가</div>
          <PlanWriteModalForm
            isStartTimeSelected={isStartTimeSelected}
            setIsStartTimeSelected={setIsStartTimeSelected}
            isEndTimeSelected={isEndTimeSelected}
            setIsEndTimeSelected={setIsEndTimeSelected}
            isColorOptionOpened={isColorOptionOpened}
            setIsColorOptionOpened={setIsColorOptionOpened}
          ></PlanWriteModalForm>
        </div>
      </Modal>
    </div>
  );
}

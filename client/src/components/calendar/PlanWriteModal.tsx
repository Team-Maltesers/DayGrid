import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../store/modal/modalSlice";
import { RootState } from "../../store/store";
import Modal from "../common/Modal";
import createTimeOptions from "../../utils/createTimeOptions";
import { currentDateState, clickedTimeState } from "../../store/modal/calendarSlice";
import { startOfWeek, addDays } from "date-fns";
import formatDay from "../../utils/formatDay";
import classes from "../../styles/calendar/PlanWriteModal.module.css";
import calendarIcon from "../../assets/image/calendar.png";
import downArrow from "../../assets/image/arrow-down.png";

export default function PlanWriteModal() {
  const [isStartTimeSelected, setIsStartTimeSelected] = useState<boolean>(false);
  const [isEndTimeSelected, setIsEndTimeSelected] = useState<boolean>(false);
  const [displayStartTime, setDisplayStartTime] = useState<number>(0);
  const [displayEndTime, setDisplayEndTime] = useState<number>(0);
  const [displayDate, setDisplayDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState({ date: new Date(), time: 0 });
  const [isColorOptionOpened, setIsColorOptionOpened] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>("#BAE7AB");

  const isOpen = useSelector((state: RootState) => state.modal.modalType);
  const currentDate = new Date(useSelector(currentDateState));
  const clickedTime = useSelector(clickedTimeState);
  const timeOptions = createTimeOptions();
  const dispatch = useDispatch();

  useEffect(() => {
    if (clickedTime[0] === 1) {
      const startDay = startOfWeek(currentDate);
      const selectedDate = addDays(startDay, clickedTime[1]);
      const selectedHour = clickedTime[2] * 4;

      setSelectedTime({ date: selectedDate, time: selectedHour });
    }
  }, [clickedTime]);

  useEffect(() => {
    setIsStartTimeSelected(false);
    setIsEndTimeSelected(false);
    setIsColorOptionOpened(false);

    setDisplayStartTime(selectedTime.time);
    setDisplayEndTime(selectedTime.time + 1);
    setDisplayDate(selectedTime.date.toDateString());
  }, [selectedTime, isOpen]);

  if (!(isOpen === "planWrite")) {
    return null;
  }

  function handleSelectStartTime(i: number) {
    setDisplayStartTime(i);
    setIsStartTimeSelected(false);

    if (displayEndTime < i) {
      setDisplayEndTime(i + 1);
    }
  }

  function createColorOptions() {
    const colorCodes = ["#FF9494", "#FFD494", "#BAE7AB", "#ACE9F1", "#BCA5ED"];
    const colorOptions = [];

    for (const colorCode of colorCodes) {
      colorOptions.push(
        <div
          className={classes.planwrite__color_select}
          style={{ backgroundColor: colorCode }}
          onClick={() => setSelectedColor(colorCode)}
        ></div>,
      );
    }

    return colorOptions;
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
          <form className={classes.planwrite__form}>
            <div className={classes.planwrite__title_input_con}>
              <input
                type="text"
                name="title"
                placeholder="제목"
                required
                className={classes.planwrite__title_input}
              />
              <div
                className={classes.planwrite__color_con}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsStartTimeSelected(false);
                  setIsEndTimeSelected(false);
                  setIsColorOptionOpened(!isColorOptionOpened);
                }}
              >
                <div
                  className={classes.planwrite__color_select}
                  style={{ backgroundColor: selectedColor }}
                ></div>
                <img src={downArrow} />
                {isColorOptionOpened && (
                  <div className={classes.planwrite__color_options}>
                    {createColorOptions().map((v) => v)}
                  </div>
                )}
              </div>
            </div>
            <div className={classes.planwrite__input_con}>
              <div className={classes.planwrite__plan_time_input_con}>
                <div className={classes.planwrite__date_input_con}>
                  <img src={calendarIcon} />
                  <input
                    type="date"
                    name="date"
                    value={formatDay(new Date(displayDate))}
                    min="2000-01-01"
                    max="9999-12-31"
                    onChange={(e) => setDisplayDate(e.target.value)}
                  />
                </div>
                <div className={classes.planwrite__time_input_con}>
                  <div
                    className={classes.planwrite__time_select}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEndTimeSelected(false);
                      setIsColorOptionOpened(false);
                      setIsStartTimeSelected(!isStartTimeSelected);
                    }}
                  >
                    {timeOptions[displayStartTime].text}
                  </div>
                  {isStartTimeSelected && (
                    <div className={classes.planwrite__time_option}>
                      {timeOptions.map((v, i) => (
                        <div key={i} onClick={() => handleSelectStartTime(i)}>
                          {v.text}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <span>-</span>
                <div className={classes.planwrite__time_input_con}>
                  <div
                    className={classes.planwrite__time_select}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsStartTimeSelected(false);
                      setIsEndTimeSelected(!isEndTimeSelected);
                      setIsColorOptionOpened(false);
                    }}
                  >
                    {timeOptions[displayEndTime].text}
                  </div>
                  {isEndTimeSelected && (
                    <div className={classes.planwrite__time_option}>
                      {timeOptions.slice(displayStartTime + 1).map((v, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            setDisplayEndTime(displayStartTime + 2 + i);
                          }}
                        >
                          {v.text}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <textarea
              name="description"
              placeholder="설명"
              className={classes.planwrite__description}
            ></textarea>
            <div className={classes.planwrite__checkbox_con}>
              <input type="checkbox" name="dday" className={classes.planwrite__checkbox} />
              <span className={classes.planwrite__checkbox_label}>D-Day 설정하기</span>
            </div>
          </form>
          <div className={classes.planwrite__btn_con}>
            <button
              className={classes.planwrite__btn_reverse}
              onClick={() => dispatch(closeModal())}
            >
              취소
            </button>
            <button>저장</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

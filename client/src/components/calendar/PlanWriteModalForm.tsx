import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPlan, postPlan } from "../../utils/http";
import { closeModal } from "../../store/modal/modalSlice";
import { editingState } from "../../store/modal/calendarSlice";
import { RootState } from "../../store/store";
import createTimeOptions from "../../utils/createTimeOptions";
import { currentDateState, clickedTimeState } from "../../store/modal/calendarSlice";
import { startOfWeek, addDays } from "date-fns";
import formatDay from "../../utils/formatDay";
import classes from "../../styles/calendar/PlanWriteModal.module.css";
import calendarIcon from "../../assets/image/calendar.png";
import downArrow from "../../assets/image/arrow-down.png";
import { PlanWriteModalFormProps } from "../../ts/PlanData";

export interface FormData {
  title: string;
  date: string;
  description: string;
}

export default function PlanWriteModalForm({
  isStartTimeSelected,
  setIsStartTimeSelected,
  isEndTimeSelected,
  setIsEndTimeSelected,
  isColorOptionOpened,
  setIsColorOptionOpened,
}: PlanWriteModalFormProps) {
  const [displayStartTime, setDisplayStartTime] = useState<number>(0);
  const [displayEndTime, setDisplayEndTime] = useState<number>(0);
  const [displayDate, setDisplayDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState({ date: new Date(), time: 0 });
  const [selectedColor, setSelectedColor] = useState<string>("#BAE7AB");
  const [ddayChecked, setDdayChecked] = useState<boolean>(false);
  const [initialDday, setInitialDday] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    date: "",
    description: "",
  });

  const isOpen = useSelector((state: RootState) => state.modal.modalType);
  const isEditing = useSelector(editingState);
  const currentDate = new Date(useSelector(currentDateState));
  const clickedTime = useSelector(clickedTimeState);
  const timeOptions = createTimeOptions();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: editPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["planContent"] });
    },
  });
  const postMutation = useMutation({
    mutationFn: postPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["planContent"] });
    },
  });

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

  useEffect(() => {
    if (isEditing[0]) {
      setFormData({
        ...formData,
        title: isEditing[1].title,
        description: isEditing[1].description,
      });

      setDisplayDate(isEditing[1].date);
      setDisplayStartTime(isEditing[1].startTime);
      setDisplayEndTime(isEditing[1].endTime);
      setSelectedColor(isEditing[1].color);
      setDdayChecked(isEditing[1].ddayChecked);
      setInitialDday(isEditing[1].ddayChecked);
    }
  }, []);

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
          key={colorCode}
        ></div>,
      );
    }

    return colorOptions;
  }

  function handleColorOptionOpen(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setIsStartTimeSelected(false);
    setIsEndTimeSelected(false);
    setIsColorOptionOpened(!isColorOptionOpened);
  }

  function handleStartTimeOptionOpen(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setIsEndTimeSelected(false);
    setIsColorOptionOpened(false);
    setIsStartTimeSelected(!isStartTimeSelected);
  }

  function handleEndTimeOptionOpen(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setIsStartTimeSelected(false);
    setIsEndTimeSelected(!isEndTimeSelected);
    setIsColorOptionOpened(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const planData = {
      ...formData,
      date: formatDay(new Date(displayDate)).slice(0, 11),
      color: selectedColor,
      startTime: displayStartTime,
      endTime: displayEndTime,
      ddayChecked: ddayChecked,
    };
    const id = isEditing[1].planId;

    if (isEditing[0]) {
      editMutation.mutate({ id, data: { ...planData } });
    } else {
      postMutation.mutate({ ...planData });
    }
    dispatch(closeModal());
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <form className={classes.planwrite__form} onSubmit={handleSubmit}>
      <div className={classes.planwrite__title_input_con}>
        <input
          type="text"
          name="title"
          placeholder="제목"
          required
          value={formData.title}
          className={classes.planwrite__title_input}
          onChange={(e) => handleChange(e)}
        />
        <div className={classes.planwrite__color_con} onClick={(e) => handleColorOptionOpen(e)}>
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
              onChange={(e) => {
                setDisplayDate(e.target.value);
                handleChange(e);
              }}
            />
          </div>
          <div className={classes.planwrite__time_input_con}>
            <div
              className={classes.planwrite__time_select}
              onClick={(e) => handleStartTimeOptionOpen(e)}
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
              onClick={(e) => handleEndTimeOptionOpen(e)}
            >
              {timeOptions[displayEndTime].text}
            </div>
            {isEndTimeSelected && (
              <div className={classes.planwrite__time_option}>
                {timeOptions.slice(displayStartTime + 1).map((v, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setDisplayEndTime(displayStartTime + 1 + i);
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
        value={formData.description}
        className={classes.planwrite__description}
        onChange={(e) => handleChange(e)}
      ></textarea>
      <div className={classes.planwrite__checkbox_con}>
        <input
          type="checkbox"
          className={`${
            initialDday
              ? classes.planwrite__checkbox_checked
              : classes.planwrite__checkbox_unchecked
          }`}
          onChange={(e) => {
            setDdayChecked(!ddayChecked);
            handleChange(e);
          }}
        />
        <span className={classes.planwrite__checkbox_label}>D-Day 설정하기</span>
      </div>
      <div className={classes.planwrite__btn_con}>
        <button className={classes.planwrite__btn_reverse} onClick={() => dispatch(closeModal())}>
          취소
        </button>
        <button type="submit">저장</button>
      </div>
    </form>
  );
}

import React, { useState } from "react";
import { DayPicker, DateFormatter } from "react-day-picker";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import "../styles/MiniCalendar.css";

// 달력에 "연도 월"로 출력될 수 있도록 날짜 포맷 변경
const formatCaption: DateFormatter = (date, options) => {
  return <>{format(date, "yyyy년 LLLL", { locale: options?.locale })}</>;
};

const MiniCalendar = (): JSX.Element => {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(today);

  return (
    <DayPicker
      locale={ko}
      formatters={{ formatCaption }}
      mode="single"
      selected={selectedDay}
      onSelect={setSelectedDay}
    />
  );
};

export default MiniCalendar;

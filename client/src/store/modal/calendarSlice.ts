import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { subMonths, addMonths } from "date-fns";

const calendarSlice = createSlice({
  name: "currentDate",
  initialState: new Date(),
  reducers: {
    moveToPrevMonth: (state) => {
      return subMonths(state, 1);
    },
    moveToNextMonth: (state) => {
      return addMonths(state, 1);
    },
    moveToToday: () => {
      return new Date();
    },
  },
});

export const { moveToPrevMonth, moveToNextMonth, moveToToday } = calendarSlice.actions;
export const currentDateState = (state: RootState) => state.currentDate;
export default calendarSlice.reducer;

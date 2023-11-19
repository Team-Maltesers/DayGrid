import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CalendarState {
  currentDate: string;
  calendarType: string;
}

const initialState: CalendarState = {
  currentDate: new Date().toISOString(),
  calendarType: "월",
};

const calendarSlice = createSlice({
  name: "currentDate",
  initialState,
  reducers: {
    changeCurrentDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload;
    },
    changeCalendarType: (state, action: PayloadAction<string>) => {
      state.calendarType = action.payload;
    },
  },
});

export const { changeCurrentDate, changeCalendarType } = calendarSlice.actions;
export const currentDateState = (state: RootState) => state.currentDate.currentDate;
export const calendarTypeState = (state: RootState) => state.currentDate.calendarType;
export default calendarSlice.reducer;

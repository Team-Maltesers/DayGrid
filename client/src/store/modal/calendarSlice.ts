import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CalendarState {
  currentDate: string;
  calendarType: string;
  clickedTime: number[];
  planId: number;
}

const initialState: CalendarState = {
  currentDate: new Date().toISOString(),
  calendarType: "월",
  clickedTime: [0, 0, 0],
  planId: 0,
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
    changeClickedTime: (state, action: PayloadAction<number[]>) => {
      state.clickedTime = action.payload;
    },
    selectedPlanId: (state, action: PayloadAction<number>) => {
      state.planId = action.payload;
    },
  },
});

export const { changeCurrentDate, changeCalendarType, changeClickedTime, selectedPlanId } =
  calendarSlice.actions;
export const currentDateState = (state: RootState) => state.currentDate.currentDate;
export const calendarTypeState = (state: RootState) => state.currentDate.calendarType;
export const clickedTimeState = (state: RootState) => state.currentDate.clickedTime;
export const planIdState = (state: RootState) => state.currentDate.planId;
export default calendarSlice.reducer;

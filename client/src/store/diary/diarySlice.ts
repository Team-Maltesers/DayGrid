import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface diaryState {
  diaryId: number;
}

const initialState: diaryState = {
  diaryId: 0,
};

const diarySlice = createSlice({
  name: "diaryId",
  initialState,
  reducers: {
    diaryId: (state, action: PayloadAction<number>) => {
      state.diaryId = action.payload;
    },
  },
});

export const { diaryId } = diarySlice.actions;
export default diarySlice.reducer;

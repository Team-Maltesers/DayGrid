import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const menuModalSlice = createSlice({
  name: "menuModal",
  initialState: false,
  reducers: {
    toggleMenuModal: (state) => {
      return !state;
    },
  },
});

export const { toggleMenuModal } = menuModalSlice.actions;
export const menuModalState = (state: RootState) => state.menuModal;
export default menuModalSlice.reducer;

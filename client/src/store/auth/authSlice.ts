import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;

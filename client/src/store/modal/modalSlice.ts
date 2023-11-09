import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: false, // 모달 초기 상태는 '닫힘'으로 설정
  reducers: {
    toggleModal: (state) => {
      return !state;
    }, // 모달 상태를 토글하는 액션
  },
});

export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;

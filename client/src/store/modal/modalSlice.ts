import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalState {
  modalType: string | null;
}

const initialState: ModalState = {
  modalType: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState, // 모달 초기 상태는 '닫힘'으로 설정
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.modalType = action.payload;
    },
    closeModal: (state) => {
      state.modalType = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalState {
  modalType: string | null;
}

const initialState: ModalState = {
  modalType: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
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

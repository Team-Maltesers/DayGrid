import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface EditingDiaryState {
  editingDiaryId: number | null;
}

const initialState: EditingDiaryState = {
  editingDiaryId: null,
};

const editingDiarySlice = createSlice({
  name: "editingDiary",
  initialState,
  reducers: {
    setEditingDiaryId: (state, action: PayloadAction<number | null>) => {
      state.editingDiaryId = action.payload;
    },
  },
});

export const { setEditingDiaryId } = editingDiarySlice.actions;
export default editingDiarySlice.reducer;

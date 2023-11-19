import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal/modalSlice";
import menuModalReducer from "./modal/menuModalSlice";
import diaryReducer from "./diary/diarySlice";
import calendarReducer from "./modal/calendarSlice";
import diaryReducer from "./diary/diarySlice";

const store = configureStore({
  reducer: {
    modal: modalReducer, // 스토어에 모달 리듀서를 추가합니다.
    menuModal: menuModalReducer,
    diaryId: diaryReducer,
    currentDate: calendarReducer,
    calendarType: calendarReducer,
    diaryId: diaryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

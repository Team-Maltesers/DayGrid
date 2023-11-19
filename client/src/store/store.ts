import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal/modalSlice";
import menuModalReducer from "./modal/menuModalSlice";
import calendarReducer from "./modal/calendarSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer, // 스토어에 모달 리듀서를 추가합니다.
    menuModal: menuModalReducer,
    currentDate: calendarReducer,
    calendarType: calendarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

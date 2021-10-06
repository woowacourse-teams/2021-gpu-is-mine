import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "../features/member/memberSlice";
import signupReducer from "../features/member/signupSlice";

export const store = configureStore({
  reducer: {
    member: memberReducer,
    signup: signupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/member/authSlice";
import signupReducer from "../features/member/signupSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

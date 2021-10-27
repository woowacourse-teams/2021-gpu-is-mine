import { configureStore } from "@reduxjs/toolkit";
import { SLICE_NAME } from "../constants";
import authReducer from "../features/member/authSlice";
import signupReducer from "../features/member/signupSlice";
import gpuServerReducer from "../features/gpuServer/gpuServerSlice";
import jobReducer from "../features/job/jobSlice";

export const store = configureStore({
  reducer: {
    [SLICE_NAME.AUTH]: authReducer,
    [SLICE_NAME.SIGNUP]: signupReducer,
    [SLICE_NAME.GPU_SERVER]: gpuServerReducer,
    [SLICE_NAME.JOB]: jobReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

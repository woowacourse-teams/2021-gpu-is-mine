import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { __IS_PRODUCTION__, SLICE_NAME } from "../constants";
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
  middleware: __IS_PRODUCTION__
    ? undefined
    : (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

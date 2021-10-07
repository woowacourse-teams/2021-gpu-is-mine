import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SLICE_NAME, STATUS } from "../../constants";
import client from "../../services/Client";
import type { RootState } from "../../app/store";

type SignupState =
  | { status: typeof STATUS.IDLE; error: null }
  | { status: typeof STATUS.LOADING; error: null }
  | { status: typeof STATUS.SUCCEED; error: null }
  | { status: typeof STATUS.FAILED; error: Error };

const generateStatusBoolean = (status: typeof STATUS[keyof typeof STATUS]) => ({
  status,
  isIdle: status === STATUS.IDLE,
  isLoading: status === STATUS.LOADING,
  isSucceed: status === STATUS.SUCCEED,
  isFailed: status === STATUS.FAILED,
  isSettled: status === STATUS.SUCCEED || status === STATUS.FAILED,
});

const initialState = {
  status: STATUS.IDLE,
  error: null,
} as SignupState;

export const selectSignupStatus = (state: RootState) => generateStatusBoolean(state.signup.status);

export const signup = createAsyncThunk<void, { email: string; password: string; name: string }>(
  "signup/signup",
  async ({ email, password, name }) =>
    client.postSignup({ email, password, name, labId: 1, memberType: "USER" })
);

const signupSlice = createSlice({
  name: SLICE_NAME.SIGNUP,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(signup.fulfilled, (state) => {
        state.status = STATUS.SUCCEED;
      })
      .addCase(signup.rejected, (state) => {
        state.status = STATUS.FAILED;
      });
  },
});

const signupReducer = signupSlice.reducer;

export default signupReducer;

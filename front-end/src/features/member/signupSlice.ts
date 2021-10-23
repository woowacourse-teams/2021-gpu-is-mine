import { createSlice, createAsyncThunk, createAction, SerializedError } from "@reduxjs/toolkit";
import { SLICE_NAME, STATUS } from "../../constants";
import { authApiClient } from "../../services";
import type { RootState } from "../../app/store";

type SignupState =
  | { status: typeof STATUS.IDLE; error: null }
  | { status: typeof STATUS.LOADING; error: null }
  | { status: typeof STATUS.SUCCEED; error: null }
  | { status: typeof STATUS.FAILED; error: SerializedError };

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
    authApiClient.postSignup({ email, password, name, labId: 1, memberType: "USER" })
);

export const resetAction = createAction("signup/resetAction");

const signupSlice = createSlice({
  name: SLICE_NAME.SIGNUP,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetAction, () => initialState)
      .addCase(signup.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(signup.fulfilled, (state) => {
        state.status = STATUS.SUCCEED;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error;
      });
  },
});

const signupReducer = signupSlice.reducer;

export default signupReducer;

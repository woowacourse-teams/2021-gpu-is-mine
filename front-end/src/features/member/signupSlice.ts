import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { SLICE_NAME, STATUS } from "../../constants";
import { defaultError } from "../../utils";
import { authApiClient } from "../../services";
import type { RootState } from "../../app/store";
import type { CustomError } from "../../utils";
import type { RequiredSerializedError } from "../job/jobSlice";

type SignupState =
  | { status: typeof STATUS.IDLE; error: null }
  | { status: typeof STATUS.LOADING; error: null }
  | { status: typeof STATUS.SUCCEED; error: null }
  | { status: typeof STATUS.FAILED; error: RequiredSerializedError };

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

export const signup = createAsyncThunk<
  void,
  { email: string; password: string; name: string },
  { rejectValue: RequiredSerializedError }
  // eslint-disable-next-line consistent-return
>("signup/signup", async ({ email, password, name }, { rejectWithValue }) => {
  try {
    return await authApiClient.postSignup({
      email,
      password,
      name,
      labId: 1,
      memberType: "USER",
    });
  } catch (err) {
    const error = err as CustomError;

    switch (error.name) {
      case "BadRequestError":
        return rejectWithValue({
          name: "회원가입 실패",
          message: error.message,
        });
      default:
        return rejectWithValue(defaultError(error));
    }
  }
});

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
        state.error = action.payload!;
      });
  },
});

const signupReducer = signupSlice.reducer;

export default signupReducer;

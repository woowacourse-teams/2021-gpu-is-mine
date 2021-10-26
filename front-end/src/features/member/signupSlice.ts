import { createSlice, createAsyncThunk, createAction, SerializedError } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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

export const signup = createAsyncThunk<
  void,
  { email: string; password: string; name: string },
  { rejectValue: SerializedError }
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
    const error = err as AxiosError<{ message: string }>;

    // Network Error
    if (error.message === "Network Error") {
      return rejectWithValue({
        name: "Network Error 발생",
        message: "잠시 후 다시 시도해주세요",
      });
    }

    // 400 대
    if (/^4/.test(error.response!.status.toString())) {
      return rejectWithValue({
        name: "회원가입 실패",
        message: error.response!.data.message,
      });
    }

    // 500 대
    if (/^5/.test(error.response!.status.toString())) {
      return rejectWithValue({
        name: "알 수 없는 에러 발생",
        message: "관리자에게 문의해주세요",
      });
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

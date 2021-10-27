/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import type { SerializedError } from "@reduxjs/toolkit";
import { SLICE_NAME, STATUS } from "../../constants";
import { defaultError } from "../../utils";
import { authApiClient } from "../../services";
import type { RootState } from "../../app/store";
import type { MemberType, MyInfoResponse } from "../../types";
import type { CustomError } from "../../utils";

interface MyInfo {
  memberId: number;
  email: string;
  name: string;
  labId: number;
  labName: string;
  memberType: MemberType;
}

export type AuthState =
  | {
      status: typeof STATUS.IDLE;
      error: null;
      myInfo: null;
    }
  | {
      status: typeof STATUS.LOADING;
      error: null;
      myInfo: null;
    }
  | {
      status: typeof STATUS.SUCCEED;
      error: null;
      myInfo: MyInfo;
    }
  | {
      status: typeof STATUS.FAILED;
      error: SerializedError;
      myInfo: null;
    };

export const generateStatusBoolean = (status: typeof STATUS[keyof typeof STATUS]) => ({
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
  myInfo: null,
} as AuthState;

export const selectLoginStatus = (state: RootState) => generateStatusBoolean(state.auth.status);

export const selectIsAuthenticated = (state: RootState) => state.auth.myInfo !== null;

export const selectMyInfo = (state: RootState) => {
  if (state.auth.myInfo == null) {
    throw new Error("Invalid myInfo");
  }

  return state.auth.myInfo;
};

export const selectMemberType = (state: RootState) => selectMyInfo(state).memberType;

export const authorize = createAsyncThunk<MyInfoResponse, { accessToken: string; expires: Date }>(
  "auth/authorize",
  async (props) => authApiClient.fetchMyInfo(props)
);

export const login = createAsyncThunk<
  void,
  { email: string; password: string },
  { rejectValue: SerializedError }
>("auth/login", async ({ email, password }, { dispatch, rejectWithValue }) => {
  let loginResponse: { accessToken: string; expires: Date };

  try {
    loginResponse = await authApiClient.postLogin({ email, password });
  } catch (err) {
    const error = err as CustomError;

    switch (error.name) {
      case "AuthorizationError":
      case "BadRequestError":
        return rejectWithValue({
          name: "로그인 실패",
          message: "이메일 또는 비밀번호를 확인해주세요",
        });
      default:
        return rejectWithValue(defaultError(error));
    }
  }

  await dispatch(authorize(loginResponse)).unwrap();
});

export const logout = createAsyncThunk<void, void>("auth/logout", () => {
  authApiClient.logout();
});

export const resetAction = createAction("auth/resetAction");

const authSlice = createSlice({
  name: SLICE_NAME.AUTH,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetAction, () => initialState)
      .addCase(login.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(login.fulfilled, (state) => {
        state.status = STATUS.SUCCEED;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload!;
      })
      .addCase(authorize.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(authorize.fulfilled, (state, { payload }) => {
        state.status = STATUS.SUCCEED;

        const {
          id,
          email,
          name,
          labResponse: { id: labId, name: labName },
          memberType,
        } = payload;

        state.myInfo = { memberId: id, email, name, labId, labName, memberType };
        state.error = null;
      })
      .addCase(authorize.rejected, (state, action) => {
        state.error = action.error;

        if (action.error.name === "AuthorizationError") {
          state.status = STATUS.IDLE;
        } else {
          state.status = STATUS.FAILED;
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.myInfo = null;
      });
  },
});

const authReducer = authSlice.reducer;

export default authReducer;

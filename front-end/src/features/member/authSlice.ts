import { createSlice, createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import { SLICE_NAME, STATUS } from "../../constants";
import { useAppDispatch } from "../../app/hooks";
import { client } from "../../services";
import type { MemberType, MyInfoResponse } from "../../types";
import type { RootState } from "../../app/store";

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
  async (props) => client.fetchMyInfo(props)
);

export const login = createAsyncThunk<
  void,
  { email: string; password: string },
  { dispatch: ReturnType<typeof useAppDispatch> }
>("auth/login", async ({ email, password }, { dispatch }) => {
  const { accessToken, expires } = await client.postLogin({ email, password });

  await dispatch(authorize({ accessToken, expires })).unwrap();
});

export const logout = createAsyncThunk<void, void>("auth/logout", () => {
  client.logout();
});

const authSlice = createSlice({
  name: SLICE_NAME.AUTH,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(login.fulfilled, (state) => {
        state.status = STATUS.SUCCEED;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        // TODO: Error Handling
        // email, password가 일치하지 않을 경우
        // AccessToken이 유효하지 않은 경우: 방금 accessToken을 발급받았기 때문에 현실적으로 존재할 가능성 매우 낮다고 판단됨
        // 500 서버 에러
        // Network 에러
        state.error = action.error;
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
        // TODO: Error Handling
        // AccessToken이 유효하지 않은 경우: 방금 accessToken을 발급받았기 때문에 현실적으로 존재할 가능성 매우 낮다고 판단됨
        // 500 서버 에러
        // Network 에러
        state.error = action.error;

        // accessToken이 유효하지 않은 경우에만 STATUS.IDLE
        // 500 서버, Network에러는 STATUS.FAILED
        state.status = STATUS.IDLE;
      })
      .addCase(logout.fulfilled, (state) => {
        state.myInfo = null;
      });
  },
});

const authReducer = authSlice.reducer;

export default authReducer;

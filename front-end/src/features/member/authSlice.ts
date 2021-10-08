import { createSlice, createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import { STORAGE_KEY, SLICE_NAME, STATUS } from "../../constants";
import client from "../../services/Client";
import storage from "../../services/Storage";
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

export const login = createAsyncThunk<MyInfoResponse, { email: string; password: string }>(
  "auth/login",
  async ({ email, password }) => {
    const { accessToken, expires } = await client.postLogin({ email, password });

    storage.set(STORAGE_KEY.ACCESS_TOKEN, accessToken);
    storage.set(STORAGE_KEY.EXPIRES, expires);

    const myInfo = await client.fetchMyInfo();

    return myInfo;
  }
);

export const authorize = createAsyncThunk<MyInfoResponse, void>(
  "auth/authorize",
  async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      client.setAuthorizationHeader(storage.get(STORAGE_KEY.ACCESS_TOKEN)!);
      return await client.fetchMyInfo();
    } catch (e) {
      const error = e as Error;

      if (error.name === "AuthorizationError") {
        storage.remove(STORAGE_KEY.ACCESS_TOKEN);
        storage.remove(STORAGE_KEY.EXPIRES);
      }

      throw error;
    }
  },
  {
    condition: () => storage.has(STORAGE_KEY.ACCESS_TOKEN),
  }
);

// TODO: logout API 요청하기
export const logout = createAsyncThunk<void, void>("auth/logout", () => {
  storage.remove(STORAGE_KEY.ACCESS_TOKEN);
  storage.remove(STORAGE_KEY.EXPIRES);
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
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = STATUS.SUCCEED;

        const {
          id,
          email,
          name,
          labResponse: { id: labId, name: labName },
          memberType,
        } = payload;

        state.myInfo = { memberId: id, email, name, labId, labName, memberType };
      })
      .addCase(login.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error;

        // TODO: Error 메세지 표준화
        // console.error(action.error);
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
      })
      .addCase(authorize.rejected, (state, action) => {
        state.status = STATUS.IDLE;
        state.error = action.error;
        // console.error(action.error);
      })
      .addCase(logout.fulfilled, (state) => {
        state.myInfo = null;
      });
  },
});

const authReducer = authSlice.reducer;

export default authReducer;

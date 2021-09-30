/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT, SESSION_STORAGE_KEY, STATUS } from "../../constants";
import type { MemberType, MyInfoResponse } from "../../types";
import type { RootState } from "../../app/store";

interface MyInfo {
  id: number;
  email: string;
  name: string;
  labId: number;
  labName: string;
  memberType: MemberType;
}

type MemberState =
  | {
      login: { status: typeof STATUS.IDLE; error: null };
      signup: { status: typeof STATUS.IDLE; error: null };
      myInfo: null;
    }
  | {
      login: { status: typeof STATUS.LOADING; error: null };
      signup: { status: typeof STATUS.LOADING; error: null };
      myInfo: null;
    }
  | {
      login: { status: typeof STATUS.SUCCEED; error: null };
      signup: { status: typeof STATUS.SUCCEED; error: null };
      myInfo: MyInfo;
    }
  | {
      login: { status: typeof STATUS.FAILED; error: Error };
      signup: { status: typeof STATUS.FAILED; error: Error };
      myInfo: null;
    };

const generateStatusBoolean = (status: typeof STATUS[keyof typeof STATUS]) => ({
  status,
  isIdle: status === STATUS.IDLE,
  isLoading: status === STATUS.LOADING,
  isSucceed: status === STATUS.SUCCEED,
  isFailed: status === STATUS.FAILED,
});

const initialState = {
  login: {
    status: STATUS.IDLE,
    error: null,
  },
  signup: {
    status: STATUS.IDLE,
    error: null,
  },
  myInfo: null,
} as MemberState;

export const selectLoginStatus = (state: RootState) =>
  generateStatusBoolean(state.member.login.status);

export const selectSignupStatus = (state: RootState) =>
  generateStatusBoolean(state.member.signup.status);

export const selectIsAuthenticated = (state: RootState) => state.member.myInfo !== null;

export const selectMyInfo = (state: RootState) => {
  if (state.member.myInfo == null) {
    throw new Error("Invalid myInfo");
  }

  return state.member.myInfo;
};

export const selectMemberType = (state: RootState) => selectMyInfo(state).memberType;

export const login = createAsyncThunk<MyInfoResponse, { email: string; password: string }>(
  "member/login",
  async ({ email, password }) => {
    const {
      data: { accessToken },
    } = await axios.post<{ accessToken: string }>(API_ENDPOINT.MEMBER.LOGIN, {
      email,
      password,
    });

    sessionStorage.setItem(SESSION_STORAGE_KEY.ACCESS_TOKEN, accessToken);

    const { data: myInfo } = await axios.get<MyInfoResponse>(API_ENDPOINT.MEMBER.ME);

    return myInfo;
  }
);

export const checkAuthorization = createAsyncThunk<MyInfoResponse, string>(
  "member/checkAuthorization",
  async (accessToken) => {
    // deliver accessToken to client
    console.log(accessToken);
    const { data: myInfo } = await axios.get<MyInfoResponse>(API_ENDPOINT.MEMBER.ME);

    return myInfo;
  }
);

export const signup = createAsyncThunk<void, { email: string; password: string; name: string }>(
  "member/signup",
  async ({ email, password, name }) => {
    await axios.post<never>(API_ENDPOINT.MEMBER.SIGNUP, {
      email,
      password,
      name,
      labId: 1,
      memberType: "USER",
    });
  }
);

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.login.status = STATUS.LOADING;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.login.status = STATUS.SUCCEED;

        const {
          id,
          email,
          name,
          labResponse: { id: labId, name: labName },
          memberType,
        } = payload;

        state.myInfo = { id, email, name, labId, labName, memberType };
      })
      .addCase(login.rejected, (state) => {
        state.login.status = STATUS.FAILED;

        // if (action.payload) {
        //   state.error = action.payload.errorMessage as Error;
        // } else {
        //   state.error = action.error as Error;
        // }
      })
      .addCase(signup.pending, (state) => {
        state.signup.status = STATUS.LOADING;
      })
      .addCase(signup.fulfilled, (state) => {
        state.signup.status = STATUS.SUCCEED;
      })
      .addCase(signup.rejected, (state) => {
        state.signup.status = STATUS.FAILED;
      })
      .addCase(checkAuthorization.pending, (state) => {
        state.login.status = STATUS.LOADING;
      })
      .addCase(checkAuthorization.fulfilled, (state, { payload }) => {
        state.login.status = STATUS.SUCCEED;

        const {
          id,
          email,
          name,
          labResponse: { id: labId, name: labName },
          memberType,
        } = payload;

        state.myInfo = { id, email, name, labId, labName, memberType };
      })
      .addCase(checkAuthorization.rejected, (state) => {
        state.login.status = STATUS.IDLE;
      });
  },
});

export default memberSlice.reducer;

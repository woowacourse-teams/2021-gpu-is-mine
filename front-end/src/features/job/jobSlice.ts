/* eslint-disable consistent-return */
import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  createAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import { jobApiClient } from "../../services";
import { SLICE_NAME, STATUS } from "../../constants";
import { defaultError, formatDate } from "../../utils";
import { generateStatusBoolean, logout, selectMyInfo } from "../member/authSlice";
import type { RootState } from "../../app/store";
import { CustomError } from "../../utils/error";
import type { JobRegisterRequest, JobStatus, Require, JobViewResponse } from "../../types";

export interface Job {
  id: number;
  name: string;
  status: JobStatus;

  memberId: number;
  memberName: string;
  gpuServerId: number;
  gpuServerName: string;

  dockerHubImage: string;
  expectedTime: string;
  createdTime: string;
  startTime: string;
  endTime: string;
}

interface ApiState {
  status: typeof STATUS[keyof typeof STATUS];
  error: RequiredSerializedError | null | undefined;
}

type JobSliceState = {
  [key: string]: ApiState;
} & {
  entities: Job[];
};

export type RequiredSerializedError = Require<SerializedError, "name" | "message">;

const GET_JOB_ALL = "job/getAll" as const;
const GET_JOB_BY_ID = "job/getById" as const;
const REGISTER_JOB = "job/register" as const;
const CANCEL_JOB_BY_ID = "job/cancelById" as const;

const initialState = {
  [GET_JOB_ALL]: { status: STATUS.IDLE, error: null },
  [GET_JOB_BY_ID]: { status: STATUS.IDLE, error: null },
  [REGISTER_JOB]: { status: STATUS.IDLE, error: null },
  [CANCEL_JOB_BY_ID]: { status: STATUS.IDLE, error: null },
  entities: [],
} as unknown as JobSliceState;

const convertJobResponse = (response: JobViewResponse): Job => {
  const {
    status,
    metaData: dockerHubImage,
    expectedTime,
    calculatedTime: {
      createdTime,
      expectedStartedTime,
      expectedCompletedTime,
      startedTime,
      completedTime,
    },
    ...rest
  } = response;

  const startTimeOrNull = status === "WAITING" ? expectedStartedTime : startedTime;
  const endTimeOrNull = status === "COMPLETED" ? completedTime : expectedCompletedTime;

  return {
    ...rest,
    status,
    expectedTime,
    dockerHubImage,
    createdTime: createdTime == null ? "-" : formatDate(new Date(createdTime)),
    startTime: startTimeOrNull == null ? "-" : formatDate(new Date(startTimeOrNull)),
    endTime: endTimeOrNull == null ? "-" : formatDate(new Date(endTimeOrNull)),
  };
};

type JobThunk =
  | typeof fetchJobAll
  | typeof fetchJobById
  | typeof registerJob
  | typeof cancelJobById;

export const selectJobActionState = (state: RootState, thunk: JobThunk) => ({
  ...generateStatusBoolean(state.job[thunk.typePrefix].status),
  error: state.job[thunk.typePrefix].error,
});

export const selectJobByIds = (state: RootState, ids: number[]) =>
  state.job.entities.filter(({ id }) => ids.includes(id));

export const selectJobById = (state: RootState, targetId: number) =>
  state.job.entities.find(({ id }) => id === targetId);

export const selectJobAll = (state: RootState) => state.job.entities.slice();

export const selectJobByMember = (state: RootState, memberId: number) =>
  state.job.entities.filter((job) => job.memberId === memberId);

export const resetJobActionState = createAction("job/reset", (thunk: JobThunk) => ({
  payload: thunk.typePrefix,
}));

export const fetchJobAll = createAsyncThunk<
  JobViewResponse[],
  void,
  { state: RootState; rejectValue: RequiredSerializedError }
>(GET_JOB_ALL, async (_, { getState, dispatch, rejectWithValue }) => {
  const { labId } = selectMyInfo(getState());

  try {
    const { jobResponses: data } = await jobApiClient.getJobAll({ labId });

    return data;
  } catch (err) {
    const error = err as CustomError;

    switch (error.name) {
      case "AuthorizationError":
        dispatch(logout());
        return rejectWithValue({
          name: "Authorization Error",
          message: error.message,
        });
      case "BadRequestError":
        return rejectWithValue({
          name: "Job 정보 불러오기 실패",
          message: error.message,
        });
      default:
        return rejectWithValue(defaultError(error));
    }
  }
});

export const fetchJobById = createAsyncThunk<
  JobViewResponse,
  { jobId: number },
  { state: RootState; rejectValue: RequiredSerializedError }
>(GET_JOB_BY_ID, async ({ jobId }, { getState, dispatch, rejectWithValue }) => {
  const { labId } = selectMyInfo(getState());

  try {
    const data = await jobApiClient.getJobById({ labId, jobId });

    return data;
  } catch (err) {
    const error = err as CustomError;

    switch (error.name) {
      case "AuthorizationError":
        dispatch(logout());
        return rejectWithValue({
          name: "Authorization Error",
          message: error.message,
        });
      case "BadRequestError":
        return rejectWithValue({
          name: "Job 정보 불러오기 실패",
          message: error.message,
        });
      default:
        return rejectWithValue(defaultError(error));
    }
  }
});

export const registerJob = createAsyncThunk<
  void,
  JobRegisterRequest,
  {
    state: RootState;
    rejectValue: RequiredSerializedError;
  }
>(
  REGISTER_JOB,
  async (
    { name, gpuServerId, expectedTime, metaData },
    { getState, dispatch, rejectWithValue }
  ) => {
    const { labId } = selectMyInfo(getState());

    try {
      await jobApiClient.postJob({ labId, name, gpuServerId, expectedTime, metaData });
      dispatch(fetchJobAll());
    } catch (err) {
      const error = err as CustomError;

      switch (error.name) {
        case "AuthorizationError":
          dispatch(logout());
          return rejectWithValue({
            name: "Authorization Error",
            message: error.message,
          });
        case "BadRequestError":
          return rejectWithValue({
            name: "Job 등록 실패",
            message: error.message,
          });
        default:
          return rejectWithValue(defaultError(error));
      }
    }
  }
);

export const cancelJobById = createAsyncThunk<
  void,
  { jobId: number; jobMemberId: number },
  {
    state: RootState;
    rejectValue: RequiredSerializedError;
  }
>(CANCEL_JOB_BY_ID, async ({ jobId, jobMemberId }, { getState, dispatch, rejectWithValue }) => {
  const { labId, memberId: myId, memberType } = selectMyInfo(getState());

  if (memberType === "USER" && jobMemberId !== myId) {
    return rejectWithValue({ name: "Job 취소 실패", message: "본인의 Job만 취소할 수 있습니다." });
  }

  try {
    await jobApiClient.putJobById({ labId, jobId });
    dispatch(fetchJobAll());
  } catch (err) {
    const error = err as CustomError;

    switch (error.name) {
      case "AuthorizationError":
        dispatch(logout());
        return rejectWithValue({
          name: "Authorization Error",
          message: error.message,
        });
      case "BadRequestError":
        return rejectWithValue({
          name: "Job 취소 실패",
          message: error.message,
        });
      default:
        return rejectWithValue(defaultError(error));
    }
  }
});

export const jobSlice = createSlice({
  name: SLICE_NAME.JOB,
  initialState,
  reducers: {
    add: (state, action: PayloadAction<JobViewResponse[]>) => {
      const ids = action.payload.map(({ id }) => id);

      const Jobs = action.payload.map(convertJobResponse);

      state.entities = state.entities.filter(({ id }) => !ids.includes(id)).concat([...Jobs]);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetJobActionState, (state, { payload }) => {
        state[payload].status = STATUS.IDLE;
        state[payload].error = null;
      })
      .addCase(fetchJobAll.pending, (state) => {
        state[fetchJobAll.typePrefix].status = STATUS.LOADING;
        state[fetchJobAll.typePrefix].error = null;
      })
      .addCase(fetchJobAll.fulfilled, (state, { payload }) => {
        state[fetchJobAll.typePrefix].status = STATUS.SUCCEED;
        state[fetchJobAll.typePrefix].error = null;

        const jobs = payload.map(convertJobResponse);

        state.entities = jobs;
      })
      .addCase(fetchJobAll.rejected, (state, action) => {
        state[fetchJobAll.typePrefix].status = STATUS.SUCCEED;
        state[fetchJobAll.typePrefix].error = action.payload;
      })
      .addCase(fetchJobById.pending, (state) => {
        state[fetchJobById.typePrefix].status = STATUS.LOADING;
        state[fetchJobById.typePrefix].error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, { payload }) => {
        state[fetchJobById.typePrefix].status = STATUS.SUCCEED;
        state[fetchJobById.typePrefix].error = null;

        const data = convertJobResponse(payload);

        const index = state.entities.findIndex(({ id }) => id === payload.id);

        if (index > -1) {
          state.entities[index] = data;
        } else {
          state.entities.push(data);
        }
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state[fetchJobById.typePrefix].status = STATUS.FAILED;
        state[fetchJobById.typePrefix].error = action.payload;
      })
      .addCase(registerJob.pending, (state) => {
        state[registerJob.typePrefix].status = STATUS.LOADING;
        state[registerJob.typePrefix].error = null;
      })
      .addCase(registerJob.fulfilled, (state) => {
        state[registerJob.typePrefix].status = STATUS.SUCCEED;
        state[registerJob.typePrefix].error = null;
      })
      .addCase(registerJob.rejected, (state, action) => {
        state[registerJob.typePrefix].status = STATUS.FAILED;
        state[registerJob.typePrefix].error = action.payload;
      })
      .addCase(cancelJobById.pending, (state) => {
        state[cancelJobById.typePrefix].status = STATUS.LOADING;
        state[cancelJobById.typePrefix].error = null;
      })
      .addCase(cancelJobById.fulfilled, (state) => {
        state[cancelJobById.typePrefix].status = STATUS.SUCCEED;
        state[cancelJobById.typePrefix].error = null;
      })
      .addCase(cancelJobById.rejected, (state, action) => {
        state[cancelJobById.typePrefix].status = STATUS.FAILED;
        state[cancelJobById.typePrefix].error = action.payload;
      });
  },
});

const jobReducer = jobSlice.reducer;

export const { add } = jobSlice.actions;

export default jobReducer;

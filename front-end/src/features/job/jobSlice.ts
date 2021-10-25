import { createSlice, createAsyncThunk, SerializedError, createAction } from "@reduxjs/toolkit";
import type { JobRegisterRequest, JobViewResponse } from "../../types";
import type { RootState } from "../../app/store";
import { jobApiClient } from "../../services";
import { SLICE_NAME, STATUS } from "../../constants";
import { generateStatusBoolean } from "../member/authSlice";

interface JobShape {
  id: number;
  name: string;
  status: "WAITING" | "COMPLETED" | "CANCELED" | "RUNNING";
  memberId: number;
  memberName: string;
  gpuServerId: number;
  gpuServerName: string;
  expectedTime: string;
  metaData: string;
  calculatedTime: {
    createdTime: string | null;
    startedTime: string | null;
    expectedStartedTime: string | null;
    completedTime: string | null;
    expectedCompletedTime: string | null;
  };
}

interface ApiState {
  status: typeof STATUS[keyof typeof STATUS];
  error: SerializedError | null;
}

const GET_JOB_ALL = "job/getAll" as const;
const GET_JOB_BY_ID = "job/getById" as const;
const REGISTER_JOB = "job/register" as const;
const CANCEL_JOB_BY_ID = "job/cancelById" as const;

interface JobSliceState {
  actions: {
    [key: string]: ApiState;
  };
  entities: {
    jobs: JobShape[];
  };
}

const initialState: JobSliceState = {
  actions: {
    [GET_JOB_ALL]: { status: STATUS.IDLE, error: null },
    [GET_JOB_BY_ID]: { status: STATUS.IDLE, error: null },
    [REGISTER_JOB]: { status: STATUS.IDLE, error: null },
    [CANCEL_JOB_BY_ID]: { status: STATUS.IDLE, error: null },
  },
  entities: {
    jobs: [],
  },
};

type JobThunk = typeof getJobAll | typeof registerJob | typeof cancelJobById;

export const selectJobActionState = (thunk: JobThunk) => (state: RootState) => ({
  ...generateStatusBoolean(state.job.actions[thunk.typePrefix].status),
  error: state.job.actions[thunk.typePrefix].error,
});

export const selectJobAll = (state: RootState) => state.job.entities.jobs;

export const selectJobById = (jobId: number) => (state: RootState) =>
  state.job.entities.jobs.find((job) => job.id === jobId);

export const resetJobActionState = createAction<string>("job/reset");

export const getJobAll = createAsyncThunk<
  JobViewResponse[],
  { labId: number },
  { state: RootState }
>(GET_JOB_ALL, async ({ labId }) => {
  const data = await jobApiClient.getJobAll({ labId });

  return data;
});

// const getJobById = createAsyncThunk<
//   JobViewResponse,
//   { labId: number; jobId: number },
//   { state: RootState }
// >(GET_JOB_BY_ID, async ({ labId, jobId }) => {
//   const data = await jobApiClient.getJobById({ labId, jobId });

//   return data;
// });

export const registerJob = createAsyncThunk<void, { labId: number } & JobRegisterRequest>(
  REGISTER_JOB,
  async ({ labId, name, gpuServerId, expectedTime, metaData }) => {
    await jobApiClient.postJob({ labId, name, gpuServerId, expectedTime, metaData });
  }
);

export const cancelJobById = createAsyncThunk<void, { labId: number; jobId: number }>(
  CANCEL_JOB_BY_ID,
  async ({ labId, jobId }) => {
    await jobApiClient.putJobById({ labId, jobId });
  }
);

export const jobSlice = createSlice({
  name: SLICE_NAME.JOB,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetJobActionState, (state, { payload: typePrefix }) => {
        state.actions[typePrefix].status = STATUS.IDLE;
        state.actions[typePrefix].error = null;
      })
      .addCase(getJobAll.pending, (state) => {
        state.actions[getJobAll.typePrefix].status = STATUS.LOADING;
        state.actions[getJobAll.typePrefix].error = null;
      })
      .addCase(getJobAll.fulfilled, (state, action) => {
        state.actions[getJobAll.typePrefix].status = STATUS.SUCCEED;
        state.actions[getJobAll.typePrefix].error = null;
        state.entities.jobs = action.payload;
      })
      .addCase(getJobAll.rejected, (state, action) => {
        state.actions[getJobAll.typePrefix].status = STATUS.FAILED;
        state.actions[getJobAll.typePrefix].error = action.error;
      })
      .addCase(registerJob.pending, (state) => {
        state.actions[registerJob.typePrefix].status = STATUS.LOADING;
        state.actions[registerJob.typePrefix].error = null;
      })
      .addCase(registerJob.fulfilled, (state) => {
        state.actions[registerJob.typePrefix].status = STATUS.SUCCEED;
        state.actions[registerJob.typePrefix].error = null;
      })
      .addCase(registerJob.rejected, (state, action) => {
        state.actions[registerJob.typePrefix].status = STATUS.FAILED;
        state.actions[registerJob.typePrefix].error = action.error;
      })
      .addCase(cancelJobById.pending, (state) => {
        state.actions[cancelJobById.typePrefix].status = STATUS.LOADING;
        state.actions[cancelJobById.typePrefix].error = null;
      })
      .addCase(cancelJobById.fulfilled, (state) => {
        state.actions[cancelJobById.typePrefix].status = STATUS.SUCCEED;
        state.actions[cancelJobById.typePrefix].error = null;
      })
      .addCase(cancelJobById.rejected, (state, action) => {
        state.actions[cancelJobById.typePrefix].status = STATUS.FAILED;
        state.actions[cancelJobById.typePrefix].error = action.error;
      });
  },
});

export default jobSlice.reducer;

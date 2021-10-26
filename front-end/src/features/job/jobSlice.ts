import { createSlice, createAsyncThunk, SerializedError, createAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../app/hooks";
import type { JobRegisterRequest, JobStatus } from "../../types";
import type { RootState } from "../../app/store";
import { jobApiClient } from "../../services";
import { SLICE_NAME, STATUS } from "../../constants";
import { generateStatusBoolean, selectMyInfo } from "../member/authSlice";
import { formatDate } from "../../utils";

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

interface JobViewResponse {
  id: number;
  name: string;
  status: JobStatus;

  memberId: number;
  memberName: string;
  gpuServerId: number;
  gpuServerName: string;

  metaData: string;
  expectedTime: string;
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

type JobSliceState = {
  [key: string]: ApiState;
} & {
  entities: Job[];
};

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

type JobThunk = typeof getJobAll | typeof registerJob | typeof cancelJobById;

export const selectJobActionState = (thunk: JobThunk) => (state: RootState) => ({
  ...generateStatusBoolean(state.job[thunk.typePrefix].status),
  error: state.job[thunk.typePrefix].error,
});

export const selectJobAll = (state: RootState) => state.job.entities;

export const selectJobById = (jobId: number) => (state: RootState) =>
  state.job.entities.find((job) => job.id === jobId);

export const resetJobActionState = createAction<string>("job/reset");

export const getJobAll = createAsyncThunk<JobViewResponse[], void, { state: RootState }>(
  GET_JOB_ALL,
  async (_, { getState }) => {
    const { labId } = selectMyInfo(getState());

    const { jobResponses: data } = await jobApiClient.getJobAll({ labId });

    return data;
  }
);

export const getJobById = createAsyncThunk<
  JobViewResponse,
  { jobId: number },
  { state: RootState }
>(GET_JOB_BY_ID, async ({ jobId }, { getState }) => {
  const { labId } = selectMyInfo(getState());

  const data = await jobApiClient.getJobById({ labId, jobId });

  return data;
});

export const registerJob = createAsyncThunk<
  void,
  JobRegisterRequest,
  { state: RootState; dispatch: ReturnType<typeof useAppDispatch> }
>(REGISTER_JOB, async ({ name, gpuServerId, expectedTime, metaData }, { getState, dispatch }) => {
  const { labId } = selectMyInfo(getState());

  await jobApiClient.postJob({ labId, name, gpuServerId, expectedTime, metaData });

  dispatch(getJobAll());
});

export const cancelJobById = createAsyncThunk<
  void,
  { jobId: number },
  { state: RootState; dispatch: ReturnType<typeof useAppDispatch> }
>(CANCEL_JOB_BY_ID, async ({ jobId }, { getState, dispatch }) => {
  const { labId } = selectMyInfo(getState());

  await jobApiClient.putJobById({ labId, jobId });

  dispatch(getJobAll());
});

export const jobSlice = createSlice({
  name: SLICE_NAME.JOB,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetJobActionState, (state, { payload }) => {
        state[payload].status = STATUS.IDLE;
        state[payload].error = null;
      })
      .addCase(getJobAll.pending, (state) => {
        state[getJobAll.typePrefix].status = STATUS.LOADING;
        state[getJobAll.typePrefix].error = null;
      })
      .addCase(getJobAll.fulfilled, (state, { payload }) => {
        state[getJobAll.typePrefix].status = STATUS.SUCCEED;
        state[getJobAll.typePrefix].error = null;

        const jobs = payload.map(
          ({
            metaData,
            calculatedTime: {
              createdTime,
              startedTime,
              expectedStartedTime,
              completedTime,
              expectedCompletedTime,
            },
            ...job
          }) => ({
            ...job,
            dockerHubImage: metaData,
            createdTime: createdTime ?? formatDate(new Date()),
            startTime:
              (job.status === "WAITING" ? expectedStartedTime : startedTime) ??
              formatDate(new Date()),
            endTime:
              (job.status === "COMPLETED" ? completedTime : expectedCompletedTime) ??
              formatDate(new Date(Date.now() + Number(job.expectedTime) * 1_000 * 3_600)),
          })
        ) as Job[];

        state.entities = jobs;
      })
      .addCase(getJobAll.rejected, (state, action) => {
        state[getJobAll.typePrefix].status = STATUS.FAILED;
        state[getJobAll.typePrefix].error = action.error;
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
        state[registerJob.typePrefix].error = action.error;
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
        state[cancelJobById.typePrefix].error = action.error;
      });
  },
});

export default jobSlice.reducer;

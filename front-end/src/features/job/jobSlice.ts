import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  createAction,
  PayloadAction,
} from "@reduxjs/toolkit";
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
  filtered: number[];
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
  filtered: [],
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

  return {
    ...rest,
    status,
    expectedTime,
    dockerHubImage,
    createdTime: createdTime ?? formatDate(new Date()),
    startTime: (status === "WAITING" ? expectedStartedTime : startedTime) ?? formatDate(new Date()),
    endTime:
      (status === "COMPLETED" ? completedTime : expectedCompletedTime) ??
      formatDate(new Date(Date.now() + Number(expectedTime) * 1_000 * 3_600)),
  };
};

type JobThunk = typeof getJobAll | typeof getJobById | typeof registerJob | typeof cancelJobById;

export const selectJobActionState = (thunk: JobThunk) => (state: RootState) => ({
  ...generateStatusBoolean(state.job[thunk.typePrefix].status),
  error: state.job[thunk.typePrefix].error,
});

export const selectJobByIds = (state: RootState, ids: number[]) =>
  state.job.entities.filter(({ id }) => ids.includes(id));

export const selectJobById = (state: RootState, targetId: number) =>
  state.job.entities.find(({ id }) => id === targetId);

export const selectJobAll = (state: RootState) => state.job.entities;

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
      .addCase(getJobAll.pending, (state) => {
        state[getJobAll.typePrefix].status = STATUS.LOADING;
        state[getJobAll.typePrefix].error = null;
      })
      .addCase(getJobAll.fulfilled, (state, { payload }) => {
        state[getJobAll.typePrefix].status = STATUS.SUCCEED;
        state[getJobAll.typePrefix].error = null;

        const jobs = payload.map(convertJobResponse);

        state.entities = jobs;
      })
      .addCase(getJobById.pending, (state) => {
        state[getJobById.typePrefix].status = STATUS.LOADING;
        state[getJobById.typePrefix].error = null;
      })
      .addCase(getJobById.fulfilled, (state, { payload }) => {
        state[getJobById.typePrefix].status = STATUS.SUCCEED;
        state[getJobById.typePrefix].error = null;

        const data = convertJobResponse(payload);

        const index = state.entities.findIndex(({ id }) => id === payload.id);

        if (index > -1) {
          state.entities[index] = data;
        } else {
          state.entities.push(data);
        }
      })
      .addCase(getJobById.rejected, (state, action) => {
        state[getJobById.typePrefix].status = STATUS.FAILED;
        state[getJobById.typePrefix].error = action.error;
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

const jobReducer = jobSlice.reducer;

export const { add } = jobSlice.actions;

export default jobReducer;

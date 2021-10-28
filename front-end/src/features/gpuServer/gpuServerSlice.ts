/* eslint-disable consistent-return */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SerializedError } from "@reduxjs/toolkit";
import { STATUS } from "../../constants";
import { defaultError } from "../../utils";
import { gpuServerApiClient } from "../../services";
import { generateStatusBoolean, logout, selectMyInfo } from "../member/authSlice";
import { add } from "../job/jobSlice";
import type { RootState } from "../../app/store";
import type { GpuServerViewDetailResponse, SimpleGpuServer } from "../../types";
import type { CustomError } from "../../utils";

interface RunningJob {
  id: number;
  name: string;
  status: "RUNNING";
  memberId: number;
}

export interface GpuServer {
  id: number;
  serverName: string;
  isOn: boolean;
  memorySize: number;
  diskSize: number;
  performance: number;
  modelName: string;
  jobs?: number[];
  runningJob: RunningJob | undefined;
  waitingJobCount: number;
  totalExpectedTime: number;
}

export type GpuServerSliceState = {
  [key: string]: {
    status: "idle" | "loading" | "succeed" | "failed";
    error: SerializedError | null;
  };
} & {
  entities: GpuServer[];
};

export const selectGpuServerStatus = (
  state: RootState,
  thunk:
    | typeof fetchAllGpuServer
    | typeof registerGpuServer
    | typeof deleteGpuServerById
    | typeof fetchGpuServerById
) => ({
  ...generateStatusBoolean(state.gpuServer[thunk.typePrefix].status),
  error: state.gpuServer[thunk.typePrefix].error,
});

export const selectAllGpuServer = (state: RootState) => state.gpuServer.entities.slice();

export const selectAllGpuServerIds = (state: RootState) =>
  state.gpuServer.entities.map(({ id }) => id);

export const selectGpuServerById = (state: RootState, targetServerId: number) => {
  const targetGpuServer = state.gpuServer.entities.find(({ id }) => id === targetServerId);

  if (targetGpuServer == null) {
    return null;
  }

  const { id: serverId, jobs, runningJob, ...rest } = targetGpuServer;

  return {
    ...rest,
    serverId,
    jobs: jobs ?? [],
    runningJob,
    runningJobName: runningJob?.name ?? "N/A",
  };
};

const initialState = {
  "gpuServer/fetchAll": { status: "idle", error: null },
  "gpuServer/fetchById": { status: "idle", error: null },
  "gpuServer/register": { status: "idle", error: null },
  "gpuServer/deleteById": { status: "idle", error: null },
  entities: [],
} as unknown as GpuServerSliceState;

export const fetchAllGpuServer = createAsyncThunk<
  SimpleGpuServer[],
  void,
  { state: RootState; rejectValue: SerializedError }
>("gpuServer/fetchAll", async (_, { getState, rejectWithValue, dispatch }) => {
  const { labId } = selectMyInfo(getState());

  try {
    const {
      data: { gpuServers },
    } = await gpuServerApiClient.fetchGpuServerAll(labId);

    return gpuServers;
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
          name: "GpuServer 정보 불러오기 실패",
          message: error.message,
        });
      default:
        return rejectWithValue(defaultError(error));
    }
  }
});

export const fetchGpuServerById = createAsyncThunk<
  GpuServerViewDetailResponse,
  number,
  { state: RootState; rejectValue: SerializedError }
>("gpuServer/fetchById", async (serverId, { getState, dispatch, rejectWithValue }) => {
  const { labId } = selectMyInfo(getState());
  try {
    const { data } = await gpuServerApiClient.fetchGpuServerById({ labId, serverId });

    dispatch(add(data.jobs));
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
          name: "GpuServer 정보 불러오기 실패",
          message: error.message,
        });
      default:
        return rejectWithValue(defaultError(error));
    }
  }
});

export const registerGpuServer = createAsyncThunk<
  void,
  {
    memorySize: number;
    diskSize: number;
    serverName: string;
    performance: number;
    modelName: string;
  },
  { state: RootState; rejectValue: SerializedError }
>(
  "gpuServer/register",
  async (
    { memorySize, diskSize, serverName, performance, modelName },
    { getState, dispatch, rejectWithValue }
  ) => {
    const { labId } = selectMyInfo(getState());
    try {
      await gpuServerApiClient.postGpuServer(labId, {
        memorySize,
        diskSize,
        serverName,
        gpuBoardRequest: { performance, modelName },
      });
      dispatch(fetchAllGpuServer());
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
            name: "GPU 서버 등록 실패",
            message: error.message,
          });
        default:
          return rejectWithValue(defaultError(error));
      }
    }
  }
);

export const deleteGpuServerById = createAsyncThunk<
  number,
  number,
  { state: RootState; rejectValue: SerializedError }
>("gpuServer/deleteById", async (serverId, { getState, dispatch, rejectWithValue }) => {
  const { labId } = selectMyInfo(getState());

  try {
    await gpuServerApiClient.deleteGpuServerById({ labId, serverId });
    dispatch(fetchAllGpuServer());
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
        dispatch(fetchAllGpuServer());
        return rejectWithValue({
          name: "GPU 서버 삭제 실패",
          message: error.message,
        });
      default:
        return rejectWithValue(defaultError(error));
    }
  }

  return serverId;
});

const gpuServerSlice = createSlice({
  name: "gpuServer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllGpuServer.pending, (state) => {
        state[fetchAllGpuServer.typePrefix].status = STATUS.LOADING;
        state[fetchAllGpuServer.typePrefix].error = null;
      })
      .addCase(fetchAllGpuServer.fulfilled, (state, { payload }) => {
        state[fetchAllGpuServer.typePrefix].status = STATUS.SUCCEED;

        state.entities = payload.map(
          ({ gpuBoard: { isWorking, id, ...board }, runningJobs, ...rest }) => ({
            ...rest,
            ...board,
            runningJob: runningJobs[0],
          })
        );
      })
      .addCase(fetchAllGpuServer.rejected, (state, action) => {
        state[fetchAllGpuServer.typePrefix].status = STATUS.FAILED;
        state[fetchAllGpuServer.typePrefix].error = action.payload!;
      })
      .addCase(registerGpuServer.pending, (state) => {
        state[registerGpuServer.typePrefix].status = STATUS.LOADING;
        state[registerGpuServer.typePrefix].error = null;
      })
      .addCase(registerGpuServer.fulfilled, (state) => {
        state[registerGpuServer.typePrefix].status = STATUS.SUCCEED;
      })
      .addCase(registerGpuServer.rejected, (state, action) => {
        state[registerGpuServer.typePrefix].status = STATUS.FAILED;
        state[registerGpuServer.typePrefix].error = action.payload!;
      })
      .addCase(deleteGpuServerById.pending, (state) => {
        state[deleteGpuServerById.typePrefix].status = STATUS.LOADING;
        state[deleteGpuServerById.typePrefix].error = null;
      })
      .addCase(deleteGpuServerById.fulfilled, (state, action) => {
        state[deleteGpuServerById.typePrefix].status = STATUS.SUCCEED;
        state.entities = state.entities.filter(({ id }) => id !== action.payload);
      })
      .addCase(deleteGpuServerById.rejected, (state, action) => {
        state[deleteGpuServerById.typePrefix].status = STATUS.FAILED;
        state[deleteGpuServerById.typePrefix].error = action.payload!;
      })
      .addCase(fetchGpuServerById.pending, (state) => {
        state[fetchGpuServerById.typePrefix].status = STATUS.LOADING;
      })
      .addCase(fetchGpuServerById.fulfilled, (state, { payload }) => {
        state[fetchGpuServerById.typePrefix].status = STATUS.SUCCEED;

        const {
          gpuBoard: { isWorking, id: boardId, ...board },
          jobs,
          ...rest
        } = payload;

        const jobIds = jobs.map(({ id }) => id);
        const runningJob = jobs.find((job) => job.status === "RUNNING") as RunningJob | undefined;
        const waitingJobs = jobs.filter((job) => job.status === "WAITING");
        const waitingJobCount = waitingJobs.length;
        const totalExpectedTime = waitingJobs
          .map(
            ({ calculatedTime: { expectedStartedTime, expectedCompletedTime } }) =>
              Number(expectedCompletedTime ?? 0) - Number(expectedStartedTime ?? 0)
          )
          .reduce((a, b) => a + b, 0);

        const index =
          state.entities.findIndex(({ id }) => id === payload.id) ?? state.entities.length;

        const gpuServer = {
          ...rest,
          ...board,
          jobs: jobIds,
          runningJob,
          waitingJobCount,
          totalExpectedTime,
        };

        if (index > -1) {
          state.entities[index] = gpuServer;
        } else {
          state.entities.push(gpuServer);
        }
      })
      .addCase(fetchGpuServerById.rejected, (state, action) => {
        state[fetchGpuServerById.typePrefix].status = STATUS.FAILED;
        state[fetchGpuServerById.typePrefix].error = action.payload!;
      });
  },
});

const gpuServerReducer = gpuServerSlice.reducer;

export default gpuServerReducer;

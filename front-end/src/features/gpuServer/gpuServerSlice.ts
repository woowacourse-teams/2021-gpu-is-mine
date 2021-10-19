import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import { STATUS } from "../../constants";
import { client } from "../../services";
import { SimpleGpuServer } from "../../types";
import { throwError } from "../../utils";
import { generateStatusBoolean, selectMemberType, selectMyInfo } from "../member/authSlice";
import type { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";

interface RunningJob {
  id: number;
  name: string;
  status: "RUNNING";
  memberId: number;
}

interface GpuServer {
  id: number;
  serverName: string;
  isOn: boolean;
  memorySize: number;
  diskSize: number;
  performance: number;
  modelName: string;
  // jobs: Job[];
  runningJob: RunningJob | undefined;
  waitingJobCount: number;
  totalExpectedTime: number;
}

type GpuServerSliceState = {
  [key: string]: {
    status: "idle" | "loading" | "succeed" | "failed";
    error: SerializedError | null;
  };
} & {
  entities: GpuServer[];
};

export const selectGpuServerStatus = (
  state: RootState,
  thunk: typeof fetchAllGpuServer | typeof registerGpuServer | typeof deleteGpuServerById
) => ({
  ...generateStatusBoolean(state.gpuServer[thunk.typePrefix].status),
  error: state.gpuServer[thunk.typePrefix].error,
});

export const selectAllGpuServerIds = (state: RootState) =>
  state.gpuServer.entities.map(({ id }) => id);

export const selectGpuServerInfoById = (state: RootState, targetServerId: number) => {
  const targetGpuServer = state.gpuServer.entities.find(({ id }) => id === targetServerId);

  if (targetGpuServer == null) {
    return throwError("GpuServerNotFoundError", `존재하지 않는 serverId입니다: ${targetServerId}`);
  }

  const {
    id: serverId,
    serverName,
    isOn,
    memorySize,
    diskSize,
    performance,
    modelName,
    runningJob, // TODO: reselect 사용 고려
    waitingJobCount, // TODO: reselect 사용 고려
    totalExpectedTime, // TODO: reselect 사용 고려
  } = targetGpuServer;

  return {
    serverId,
    serverName,
    isOn,
    memorySize,
    diskSize,
    performance,
    modelName,
    runningJob,
    runningJobName: runningJob?.name ?? "N/A",
    waitingJobCount,
    totalExpectedTime,
    memberType: selectMemberType(state),
  };
};

const initialState = {
  "gpuServer/fetchAll": { status: "idle", error: null },
  "gpuServer/register": { status: "idle", error: null },
  "gpuServer/deleteById": { status: "idle", error: null },
  entities: [],
} as unknown as GpuServerSliceState;

export const fetchAllGpuServer = createAsyncThunk<SimpleGpuServer[], void, { state: RootState }>(
  "gpuServer/fetchAll",
  async (_, { getState }) => {
    const { labId } = selectMyInfo(getState());

    const {
      data: { gpuServers },
    } = await client.fetchGpuServerAll(labId);

    return gpuServers;
  }
);

export const registerGpuServer = createAsyncThunk<
  void,
  {
    memorySize: number;
    diskSize: number;
    serverName: string;
    performance: number;
    modelName: string;
  },
  { state: RootState; dispatch: ReturnType<typeof useAppDispatch> }
>(
  "gpuServer/register",
  async ({ memorySize, diskSize, serverName, performance, modelName }, { getState }) => {
    const { labId } = selectMyInfo(getState());

    await client.postGpuServer(labId, {
      memorySize,
      diskSize,
      serverName,
      gpuBoardRequest: { performance, modelName },
    });

    // dispatch(fetchAllGpuServer());
  }
);

export const deleteGpuServerById = createAsyncThunk<
  number,
  number,
  { state: RootState; dispatch: ReturnType<typeof useAppDispatch> }
>("gpuServer/deleteById", async (serverId, { getState }) => {
  const { labId } = selectMyInfo(getState());

  await client.deleteGpuServerById({ labId, serverId });

  // dispatch(fetchAllGpuServer());

  return serverId;
});

const gpuServer = createSlice({
  name: "gpuServer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllGpuServer.pending, (state) => {
        state[fetchAllGpuServer.typePrefix].status = STATUS.LOADING;
        state[fetchAllGpuServer.typePrefix].error = null;
      })
      .addCase(fetchAllGpuServer.fulfilled, (state, action) => {
        state[fetchAllGpuServer.typePrefix].status = STATUS.SUCCEED;

        state.entities = action.payload.map(
          ({ gpuBoard: { performance, modelName }, runningJobs, ...rest }) => ({
            ...rest,
            performance,
            modelName,
            runningJob: runningJobs[0],
          })
        );
      })
      .addCase(fetchAllGpuServer.rejected, (state, action) => {
        state[fetchAllGpuServer.typePrefix].status = STATUS.FAILED;
        state[fetchAllGpuServer.typePrefix].error = action.error;
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
        state[registerGpuServer.typePrefix].error = action.error;
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
        state[deleteGpuServerById.typePrefix].error = action.error;
      });
  },
});

const gpuServerReducer = gpuServer.reducer;

export default gpuServerReducer;

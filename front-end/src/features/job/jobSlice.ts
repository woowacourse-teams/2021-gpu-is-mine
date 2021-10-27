import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { JobStatus } from "../../types";
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

type JobViewResponse = {
  id: number;
  name: string;
  status: JobStatus;

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
};

type JobSliceState = {
  [key: string]: {
    status: "idle" | "loading" | "succeed" | "failed";
    error: SerializedError | null;
  };
} & {
  entities: Job[];
};

export const selectJobByIds = (state: RootState, ids: number[]) =>
  state.job.entities.filter(({ id }) => ids.includes(id));

export const selectJobById = (state: RootState, targetId: number) =>
  state.job.entities.find(({ id }) => id === targetId);

const initialState = {
  "job/fetchAll": { status: "idle", error: null },
  "job/register": { status: "idle", error: null },
  // "job/deleteById": { status: "idle", error: null },
  entities: [],
} as unknown as GpuServerSliceState;

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<JobViewResponse[]>) => {
      const ids = action.payload.map(({ id }) => id);

      const Jobs = action.payload.map((job) => {
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
        } = job;

        return {
          ...job,
          expectedTime,
          dockerHubImage,
          createdTime: createdTime ?? formatDate(new Date()),
          startTime:
            (status === "WAITING" ? expectedStartedTime : startedTime) ?? formatDate(new Date()),
          endTime:
            (status === "COMPLETED" ? completedTime : expectedCompletedTime) ??
            formatDate(new Date(Date.now() + Number(expectedTime) * 1_000 * 3_600)),
        };
      });

      state.entities = state.entities.filter(({ id }) => !ids.includes(id)).concat([...Jobs]);
    },
  },
  // extraReducers: (builder) => {
  // builder.addcase();
  // },
});

export const { add } = jobSlice.actions;

const jobReducer = jobSlice.reducer;

export default jobReducer;

import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { JobStatus, JobViewResponse } from "../../types";
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
} as unknown as JobSliceState;

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

        const startTimeOrNull = status === "WAITING" ? expectedStartedTime : startedTime;
        const endTimeOrNull = status === "COMPLETED" ? completedTime : expectedCompletedTime;

        return {
          ...job,
          expectedTime,
          dockerHubImage,
          createdTime: createdTime ?? formatDate(new Date()),
          startTime: startTimeOrNull == null ? "-" : formatDate(new Date(startTimeOrNull)),
          endTime: endTimeOrNull == null ? "-" : formatDate(new Date(endTimeOrNull)),
        };
      });

      state.entities = state.entities.filter(({ id }) => !ids.includes(id)).concat([...Jobs]);
    },
  },
});

export const { add } = jobSlice.actions;

const jobReducer = jobSlice.reducer;

export default jobReducer;

// eslint-disable-next-line import/prefer-default-export
export const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEED: "succeed",
  FAILED: "failed",
} as const;

export const SLICE_NAME = {
  AUTH: "auth",
  SIGNUP: "signup",
  GPU_SERVER: "gpuServer",
  JOB: "job",
} as const;

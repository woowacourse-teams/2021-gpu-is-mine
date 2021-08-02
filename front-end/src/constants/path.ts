import { ValuesType } from "../types";

export type Route =
  | ValuesType<typeof PATH["MANAGER"]["GPU_SERVER"]>
  | ValuesType<typeof PATH["MANAGER"]["JOB"]>
  | ValuesType<typeof PATH["MEMBER"]>;

const PATH = {
  MANAGER: {
    GPU_SERVER: {
      VIEW: "/manager/gpu-server/view",
      VIEW_DETAIL: "/manager/gpu-server/view/:serverId",
      REGISTER: "/manager/gpu-server/register",
    },
    JOB: {
      VIEW: "/manager/job/view",
      VIEW_DETAIL: "/manager/job/view/:jobId",
      REGISTER: "/manager/job/register",
    },
  },
  MEMBER: {
    SIGNUP: "/member/signup",
    LOGIN: "/member/login",
    LOGOUT: "/member/logout",
  },
} as const;

export default PATH;

import { ValuesType } from "../types";

export type Route =
  | ValuesType<typeof PATH["GPU_SERVER"]>
  | ValuesType<typeof PATH["JOB"]>
  | ValuesType<typeof PATH["MEMBER"]>;

const PATH = {
  GPU_SERVER: {
    VIEW: "/gpu-server/view",
    VIEW_DETAIL: "/gpu-server/view/:serverId",
    REGISTER: "/gpu-server/register",
  },
  JOB: {
    VIEW: "/job/view",
    VIEW_DETAIL: "/job/view/:jobId",
    REGISTER: "/job/register",
  },
  MEMBER: {
    SIGNUP: "/member/signup",
    LOGIN: "/member/login",
    LOGOUT: "/member/logout",
  },
} as const;

export default PATH;

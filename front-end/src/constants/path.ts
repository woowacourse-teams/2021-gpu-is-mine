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

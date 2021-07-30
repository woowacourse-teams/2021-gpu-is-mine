const PATH = {
  MANAGER: {
    GPU_SERVER: {
      VIEW: "/manager/gpu-server/view",
      REGISTER: "/manager/gpu-server/register",
    },
    JOB: {
      VIEW: "/manager/job/view",
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

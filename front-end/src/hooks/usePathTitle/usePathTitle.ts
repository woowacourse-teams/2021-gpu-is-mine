import { useRouteMatch } from "react-router-dom";
import { PATH } from "../../constants";

const PATH_TITLE = {
  [PATH.GPU_SERVER.VIEW]: "GPU 서버 조회",
  [PATH.GPU_SERVER.VIEW_DETAIL]: "GPU 서버 상세 조회",
  [PATH.GPU_SERVER.REGISTER]: "GPU 서버 등록",
  [PATH.JOB.VIEW]: "Job 조회",
  [PATH.JOB.VIEW_DETAIL]: "Job 상세 조회",
  [PATH.JOB.REGISTER]: "Job 등록",
  [PATH.MEMBER.SIGNUP]: "회원가입",
  [PATH.MEMBER.LOGIN]: "로그인",
} as const;

const usePathTitle = () => {
  const match = useRouteMatch<{ path: keyof typeof PATH_TITLE }>();

  return PATH_TITLE[match.path as keyof typeof PATH_TITLE];
};

export default usePathTitle;

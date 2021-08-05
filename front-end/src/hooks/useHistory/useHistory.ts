import { useHistory, matchPath } from "react-router-dom";
import { PATH } from "../../constants";

const pathList = [
  Object.values(PATH.MANAGER.GPU_SERVER),
  Object.values(PATH.MANAGER.JOB),
  Object.values(PATH.MEMBER),
].flat();

// eslint-disable-next-line import/prefer-default-export
export const useMoveToPage = (route: string) => {
  const history = useHistory();

  const match = matchPath(route, {
    path: pathList,
    exact: true,
  });

  if (!match) {
    throw new Error("정의되지 않은 url 입니다.");
  }

  return () => history.push(route);
};

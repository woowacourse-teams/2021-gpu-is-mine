import { useHistory, matchPath, useParams } from "react-router-dom";
import { PATH } from "../../constants";

const pathList = [
  Object.values(PATH.GPU_SERVER),
  Object.values(PATH.JOB),
  Object.values(PATH.MEMBER),
].flat();

export const useGoToPage = (pointer: number) => {
  const history = useHistory();

  return () => history.go(pointer);
};

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

export const useParseParams = (key: string) => {
  const parsed = useParams<Record<string, string>>();

  if (typeof parsed !== "object" || parsed == null || !(key in parsed)) {
    throw Error(`Invalid ${key} in params: ${JSON.stringify(parsed)}`);
  }

  return parsed[key];
};

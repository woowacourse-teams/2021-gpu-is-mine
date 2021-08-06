import { useHistory, matchPath, useParams } from "react-router-dom";
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

export const useParseParams = <T extends string | number>(param: T) => {
  const parsed = useParams() as unknown;

  if (typeof parsed !== "object" || parsed == null || !(param in parsed)) {
    throw Error(`Invalid ${param} in params: ${String(param)}`);
  }

  if (typeof param === "number" && Number.isNaN(Number(param))) {
    throw Error(`Invalid ${param} in params: ${String(param)} is NaN`);
  }

  return typeof param === "number" ? Number(param) : param;
};

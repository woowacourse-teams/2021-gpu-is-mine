import { useHistory } from "react-router-dom";
import { Route } from "../../constants";

// eslint-disable-next-line import/prefer-default-export
export const useMoveToPage = (route: Route) => {
  const history = useHistory();

  return () => history.push(route);
};

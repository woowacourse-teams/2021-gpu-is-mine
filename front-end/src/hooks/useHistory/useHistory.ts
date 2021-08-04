import { useHistory } from "react-router-dom";
// eslint-disable-next-line import/no-extraneous-dependencies
import { To } from "history";

// eslint-disable-next-line import/prefer-default-export
export const useMoveToPage = (route: To) => {
  const history = useHistory();

  return () => history.push(route);
};

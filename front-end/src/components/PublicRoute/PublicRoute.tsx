import { Redirect, Route } from "react-router-dom";
import { ComponentProps } from "react";
import { useAuth } from "../../hooks";
import { PATH } from "../../constants";

const PublicRoute = ({ children, ...rest }: ComponentProps<typeof Route>) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={
        /* prettier-ignore */
        ({ location }) =>
          !isAuthenticated
            ? (children)
            : (<Redirect to={{pathname: PATH.MANAGER.GPU_SERVER.VIEW, state: { from: location }}}/>)
      }
    />
  );
};

export default PublicRoute;

import { Redirect, Route } from "react-router-dom";
import { ComponentProps } from "react";
import { useAuth } from "../../hooks";
import { PATH } from "../../constants";

const PrivateRoute = ({ children, ...rest }: ComponentProps<typeof Route>) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={
        /* prettier-ignore */
        ({ location }) =>
          isAuthenticated
            ? (children)
            : (<Redirect to={{pathname: PATH.MEMBER.LOGIN, state: { from: location }}}/>)
      }
    />
  );
};

export default PrivateRoute;

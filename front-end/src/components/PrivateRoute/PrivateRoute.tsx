import { Redirect, Route } from "react-router-dom";
import { ComponentProps } from "react";
import { PATH } from "../../constants";
import { useAuth } from "../AuthProvider/hooks";

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

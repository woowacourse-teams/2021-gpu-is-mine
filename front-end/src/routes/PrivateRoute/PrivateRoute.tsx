import { ComponentProps } from "react";
import { Redirect, Route } from "react-router-dom";
import { PATH } from "../../constants";
import { useAppSelector } from "../../app/hooks";
import { selectIsAuthenticated } from "../../features/member/memberSlice";

const PrivateRoute = ({ children, ...rest }: ComponentProps<typeof Route>) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect to={{ pathname: PATH.MEMBER.LOGIN, state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;

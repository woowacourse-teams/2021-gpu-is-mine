import { Redirect, Route } from "react-router-dom";
import { ComponentProps } from "react";
import { PATH } from "../../constants";
import { useAppSelector } from "../../app/hooks";
import { selectIsAuthenticated } from "../../features/member/memberSlice";

type Location = {
  state?: { from?: Location };
  pathname: string;
};

const PublicRoute = ({ children, ...rest }: ComponentProps<typeof Route>) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <Route
      {...rest}
      render={({ location }: { location: Location }) =>
        isAuthenticated ? (
          <Redirect
            to={{
              pathname: location.state?.from?.pathname ?? PATH.GPU_SERVER.VIEW,
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default PublicRoute;

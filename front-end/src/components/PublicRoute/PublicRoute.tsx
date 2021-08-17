import { Redirect, Route } from "react-router-dom";
import { ComponentProps } from "react";
import { useAuth } from "../../hooks";
import { PATH } from "../../constants";

type Location = {
  state?: { from?: Location };
  pathname: string;
};

const PublicRoute = ({ children, ...rest }: ComponentProps<typeof Route>) => {
  const { isAuthenticated } = useAuth();

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

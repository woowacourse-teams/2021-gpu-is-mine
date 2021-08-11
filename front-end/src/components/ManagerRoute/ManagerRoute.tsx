import { ComponentProps } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../hooks";
import { PATH } from "../../constants";

const ManagerRoute = ({ children, ...rest }: ComponentProps<typeof Route>) => {
  const { myInfo } = useAuth();

  return (
    <Route {...rest}>
      {myInfo?.memberType === "MANAGER" ? (
        children
      ) : (
        <Redirect to={{ pathname: PATH.MEMBER.LOGIN }} />
      )}
    </Route>
  );
};

export default ManagerRoute;

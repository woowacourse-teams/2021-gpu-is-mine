import { ComponentProps } from "react";
import { Redirect, Route } from "react-router-dom";
import { PATH } from "../../constants";
import { useAppSelector } from "../../app/hooks";
import { selectMemberType } from "../../features/member/memberSlice";

const ManagerRoute = ({ children, ...rest }: ComponentProps<typeof Route>) => {
  const memberType = useAppSelector(selectMemberType);

  return (
    <Route {...rest}>
      {memberType === "MANAGER" ? children : <Redirect to={{ pathname: PATH.MEMBER.LOGIN }} />}
    </Route>
  );
};

export default ManagerRoute;

import { Switch, Redirect } from "react-router-dom";
import { ManagerRoute, PrivateRoute, PublicRoute } from "../routes";
import {
  GpuServerView,
  GpuServerRegister,
  JobView,
  JobRegister,
  JobViewDetail,
  Login,
  Signup,
  GpuServerViewDetail,
} from "../pages";
import Providers from "../providers/Providers";
import { PATH } from "../constants";

const App = () => (
  <Providers>
    <Switch>
      <PublicRoute exact path={PATH.MEMBER.SIGNUP}>
        <Signup />
      </PublicRoute>
      <PublicRoute exact path={PATH.MEMBER.LOGIN}>
        <Login />
      </PublicRoute>
      <PrivateRoute exact path={PATH.GPU_SERVER.VIEW}>
        <GpuServerView />
      </PrivateRoute>
      <PrivateRoute exact path={PATH.GPU_SERVER.VIEW_DETAIL}>
        <GpuServerViewDetail />
      </PrivateRoute>
      <PrivateRoute exact path={PATH.GPU_SERVER.REGISTER}>
        <ManagerRoute>
          <GpuServerRegister />
        </ManagerRoute>
      </PrivateRoute>
      <PrivateRoute exact path={[PATH.JOB.REGISTER]}>
        <JobRegister />
      </PrivateRoute>
      <PrivateRoute exact path={PATH.JOB.VIEW}>
        <JobView />
      </PrivateRoute>
      <PrivateRoute exact path={PATH.JOB.VIEW_DETAIL}>
        <JobViewDetail />
      </PrivateRoute>
      <Redirect to={PATH.MEMBER.LOGIN} />
    </Switch>
  </Providers>
);

export default App;

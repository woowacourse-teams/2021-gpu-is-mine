import { Switch, Redirect } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "../components";
import {
  GpuServerView,
  GpuServerRegister,
  JobView,
  JobRegister,
  JobViewDetail,
} from "../pages/manager";
import { Login, Signup } from "../pages/member";
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
      <PrivateRoute exact path={PATH.MANAGER.GPU_SERVER.VIEW}>
        <GpuServerView />
      </PrivateRoute>
      <PrivateRoute exact path={PATH.MANAGER.GPU_SERVER.REGISTER}>
        <GpuServerRegister />
      </PrivateRoute>
      <PrivateRoute exact path={PATH.MANAGER.JOB.REGISTER}>
        <JobRegister />
      </PrivateRoute>
      <PrivateRoute exact path={PATH.MANAGER.JOB.VIEW}>
        <JobView />
      </PrivateRoute>
      <PrivateRoute path={PATH.MANAGER.JOB.VIEW_DETAIL}>
        <JobViewDetail />
      </PrivateRoute>
      <Redirect to={PATH.MEMBER.LOGIN} />
    </Switch>
  </Providers>
);

export default App;

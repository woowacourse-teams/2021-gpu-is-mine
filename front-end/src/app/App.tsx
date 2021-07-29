import { Switch, Route, Redirect } from "react-router-dom";
import { PrivateRoute } from "../components";
import { GpuServerView, GpuServerRegister, JobView, JobRegister } from "../pages/manager";
import { Login, Signup, Logout } from "../pages/member";
import Providers from "../providers/Providers";
import { PATH } from "../constants";

const App = () => (
  <Providers>
    <Switch>
      <Route exact path={PATH.MEMBER.LOGIN}>
        <Login />
      </Route>
      <Route exact path={PATH.MEMBER.LOGOUT}>
        <Logout />
      </Route>
      <Route exact path={PATH.MEMBER.SIGNUP}>
        <Signup />
      </Route>
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
      <Redirect to={PATH.MEMBER.LOGIN} />
    </Switch>
  </Providers>
);

export default App;

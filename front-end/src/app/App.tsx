import { Switch, Route, Redirect } from "react-router-dom";
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
      <Route exact path={PATH.MANAGER.GPU_SERVER.VIEW}>
        <GpuServerView />
      </Route>
      <Route exact path={PATH.MANAGER.GPU_SERVER.REGISTER}>
        <GpuServerRegister />
      </Route>
      <Route exact path={PATH.MANAGER.JOB.REGISTER}>
        <JobRegister />
      </Route>
      <Route exact path={PATH.MANAGER.JOB.VIEW}>
        <JobView />
      </Route>
      <Redirect to={PATH.MEMBER.LOGIN} />
    </Switch>
  </Providers>
);

export default App;

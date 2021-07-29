import { Switch, Route, Redirect } from "react-router-dom";
import { GpuServerView, GpuServerRegister, JobView, JobRegister } from "../pages/manager";
import Providers from "../providers/Providers";
import { PATH } from "../constants";

const App = () => (
  <Providers>
    <Switch>
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
      <Redirect to={PATH.MANAGER.GPU_SERVER.VIEW} />
    </Switch>
  </Providers>
);

export default App;

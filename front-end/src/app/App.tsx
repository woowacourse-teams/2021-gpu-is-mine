import { Switch, Route, Redirect } from "react-router-dom";
import { GpuServerView, GpuServerRegister } from "../pages/manager";
import { PATH } from "../constants";
import Providers from "../providers/Providers";

const App = () => (
  <Providers>
    <Switch>
      <Route exact path={PATH.MANAGER.GPU_SERVER.VIEW}>
        <GpuServerView />
      </Route>
      <Route exact path={PATH.MANAGER.GPU_SERVER.REGISTER}>
        <GpuServerRegister />
      </Route>
      <Redirect to={PATH.MANAGER.GPU_SERVER.VIEW} />
    </Switch>
  </Providers>
);

export default App;

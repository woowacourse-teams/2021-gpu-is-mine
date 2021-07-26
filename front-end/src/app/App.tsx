import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { GlobalStyle, ThemeProvider } from "../styles";
import { GpuServerView, GpuServerRegister, JobRegister } from "../pages/manager";
import { PATH } from "../constants";

const App = () => (
  <ThemeProvider>
    <GlobalStyle />
    <Router>
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
        <Redirect to={PATH.MANAGER.GPU_SERVER.VIEW} />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;

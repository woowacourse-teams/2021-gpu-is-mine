import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ThemeProvider from "../styles/ThemeProvider";
import GlobalStyle from "../styles/GlobalStyle";
import GpuServerView from "../pages/manager/GpuServerView/GpuServerView";
import PATH from "../constants/path";

const App = () => (
  <ThemeProvider>
    <GlobalStyle />
    <Router>
      <Switch>
        <Route exact path={[PATH.MANAGER.GPU_SERVER.VIEW, "/"]}>
          <GpuServerView />
        </Route>
        <Redirect to={PATH.MANAGER.GPU_SERVER.VIEW} />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;

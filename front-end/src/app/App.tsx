import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ThemeProvider from "../styles/ThemeProvider";
import GlobalStyle from "../styles/GlobalStyle";
import GpuServerView from "../pages/manager/GpuServerView/GpuServerView";

const App = () => (
  <ThemeProvider>
    <GlobalStyle />
    <Router>
      <Switch>
        <Route path="/">
          <GpuServerView />
        </Route>
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;

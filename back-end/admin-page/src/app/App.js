import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Login, Lab } from "../components";

function App({ apiService }) {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/lab">
            <Lab apiService={apiService} />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

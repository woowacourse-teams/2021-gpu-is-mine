import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Login, Lab } from "../components";

function App({ apiService }) {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/lab">
            {sessionStorage.length !== 0 ? (
              <Lab apiService={apiService} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/">
            <Login apiService={apiService} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

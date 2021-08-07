import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../components/login/login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
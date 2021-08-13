import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import Service from "./service/ApiService";

const apiService = new Service();
ReactDOM.render(
  <StrictMode>
    <App apiService={apiService} />
  </StrictMode>,
  document.getElementById("root")
);

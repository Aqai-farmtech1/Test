import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import MasterProvider from "./contexts/MasterProvider";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

ReactDOM.render(
  <MasterProvider>
    <Router>
      <App />
    </Router>
  </MasterProvider>,
  document.getElementById("root")
);

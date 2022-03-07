import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthProvider from "./contexts/AuthProvider";
import MasterProvider from "./contexts/MasterProvider";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

ReactDOM.render(
  <AuthProvider>
    <MasterProvider>
      <Router>
        <App />
      </Router>
    </MasterProvider>
  </AuthProvider>,
  document.getElementById("root")
);

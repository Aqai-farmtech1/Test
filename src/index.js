import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import AuthProvider from "./contexts/AuthProvider";
import MasterProvider from "./contexts/MasterProvider";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <MasterProvider>
          <App />
        </MasterProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

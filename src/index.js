import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import AuthProvider from "./contexts/AuthProvider";
import MasterProvider from "./contexts/MasterProvider";
import "./index.css";

ReactDOM.render(
  <AuthProvider><MasterProvider><App /></MasterProvider></AuthProvider>,
  document.getElementById("root")
);

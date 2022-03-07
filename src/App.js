import React from "react";
import { Routes, Route } from "react-router-dom";
// import MainLayout from "./components/layout/MainLayout";

import "antd/dist/antd.css";
import Login from "./pages/login/Login";
// import AuthenticatedRoute from "./components/wrapper/AuthenticatedRoute";
import PageNotFound from "./pages/error 404/PageNotFound";
import PageInfoProvider from "./contexts/PageInfoProvider";
import Routing from './routing/Routing';

// import { authenticatedroutes, loginroutes } from "./routes/router";
function App() {
  return (
    <>
      <PageInfoProvider>
        <Routing />
      </PageInfoProvider>
    </>
  );
}

export default App;
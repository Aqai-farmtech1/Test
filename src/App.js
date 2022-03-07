import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

import "antd/dist/antd.css";
import Login from "./pages/login/Login";
import AuthenticatedRoute from "./components/wrapper/AuthenticatedRoute";
import PageNotFound from "./pages/error 404/PageNotFound";
import PageInfoProvider from "./contexts/PageInfoContext";
import Routing from './routing/Routing';

function App() {
  return (
    <>
      <PageInfoProvider>
        <Routing />
        {/* {authenticatedroutes.map((routes, index) => {
                return (
                  <Route
                    path={routes.path}
                    element={routes.component}
                    key={index}
                    exact
                  />
                );
              })} */}

      </PageInfoProvider>
    </>
  );
}

export default App;
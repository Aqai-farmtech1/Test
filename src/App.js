import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

import "antd/dist/antd.css";
import Login from "./pages/login/Login";
import AuthenticatedRoute from "./components/wrapper/AuthenticatedRoute";
import PageNotFound from "./pages/error 404/PageNotFound";
import PageInfoProvider from "./contexts/PageInfoContext";

import { authenticatedroutes, loginroutes } from "./routes/router";
function App() {
  return (
    <>
      <PageInfoProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />

          <Route element={<AuthenticatedRoute />}>
            <Route path="/" element={<MainLayout />}>
              {authenticatedroutes.map((routes, index) => {
                return (
                  <Route
                    path={routes.path}
                    element={routes.component}
                    key={index}
                    exact
                  />
                );
              })}
            </Route>
          </Route>
        </Routes>
      </PageInfoProvider>
    </>
  );
}

export default App;
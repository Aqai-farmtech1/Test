import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "antd/dist/antd.css";
import "./helper/axios.helper";

import MainLayout from "./components/layout/MainLayout";
import Login from "./pages/login/Login";
import AuthenticatedRoute from "./components/wrapper/AuthenticatedRoute";
import LoginRoute from "./components/wrapper/LoginRoute";
import PageNotFound from "./pages/error 404/PageNotFound";
import PageInfoProvider from "./contexts/PageInfoProvider";
import ForgetPassword from "./pages/forgetpassword/ForgetPassword";
import CheckYourMail from "./pages/forgetpassword/CheckYourMail";

import { authenticatedroutes } from "./routes/router";
import LoginLayout from "./components/layout/login layout/LoginLayout";
import tryCatch from "./helper/tryCatch.helper";
import useAuth from "./hooks/useAuth";
import useMasters from "./hooks/useMasters";
import FarmList from "./pages/farm list/FarmList";
import { checkToken } from "./api/checktoken.api";

function App() {
  const { setToken } = useAuth();
  const { fetchMasters } = useMasters();

  const tokenCheck = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      const [tokenResponse, tokenError] = await tryCatch(checkToken(token));
      if (!tokenError) {
        localStorage.setItem("token", token);
        setToken(token);
        fetchMasters(token);
      } else {
        localStorage.removeItem("token");
        setToken("");
      }
    } else {
      setToken("");
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <>
      <PageInfoProvider>
        <Routes>
          <Route element={<LoginRoute />}>
            <Route path="/login" element={<LoginLayout />}>
              <Route index element={<Login />} />
              <Route path="forgetpassword" element={<ForgetPassword />} />
              <Route path="mailconfirmation" element={<CheckYourMail />} />
            </Route>
          </Route>

          <Route element={<AuthenticatedRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<FarmList />} />
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

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </PageInfoProvider>
    </>
  );
}

export default App;

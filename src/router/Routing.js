import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginRoute from "../components/wrapper/LoginRoute";
import CheckYourMail from "../pages/forgetpassword/CheckYourMail";
import ForgetPassword from "../pages/forgetpassword/ForgetPassword";
import Login from "../pages/login/Login";
import LoginLayout from "../components/layout/login layout/LoginLayout";
import FarmList from "../pages/farm list/FarmList";
import CreateFarm from "../pages/create farm/CreateFarm";
import AuthenticatedRoute from "../components/wrapper/AuthenticatedRoute";
import MainLayout from "../components/layout/MainLayout";
import FarmInfo from "../pages/farm info/FarmInfo";
import GoatList from "../pages/goatlist/GoatList";
import GoatInfo from "../pages/goat info/GoatInfo";
import FarmGoatList from "../pages/farm list goat wise/FarmGoatList";
import DeviceList from "../pages/device/DeviceList";
import EditFarm from "../pages/edit farm/EditFarm";
import PageNotFound from "../pages/error 404/PageNotFound";

const loginRoutes = [
  {
    element: <Login />,
    index: true,
    path: "",
  },
  {
    element: <ForgetPassword />,
    path: "forgetpassword",
  },
  {
    element: <CheckYourMail />,
    path: "checkmail",
  },
];

const AuthenticatedRoutes = [
  {
    element: <FarmList />,
    index: true,
    path: "",
  },
  {
    element: <FarmList />,
    path: "farm",
  },
  {
    element: <CreateFarm />,
    path: "farm/create",
  },
  {
    element: <EditFarm />,
    path: "farm/:farmid/edit",
  },
  {
    element: <FarmInfo />,
    path: "farm/:farmid",
  },
  {
    element: <GoatList />,
    path: "farm/:farmid/goat",
  },
  {
    element: <GoatList />,
    path: "goat/:farmid",
  },
  {
    element: <GoatInfo />,
    path: "farm/:farmid/goat/:goatid",
  },
  {
    element: <GoatInfo />,
    path: "goat/:farmid/:goatid",
  },
  { element: <FarmGoatList />, path: "goat" },
  {
    element: <DeviceList />,
    path: "device",
  },
];

export default function Routing() {
  return (
    <Routes>
      <Route element={<LoginRoute />}>
        <Route path="/login" element={<LoginLayout />}>
          {loginRoutes.map((route, i) => (
            <Route
              key={i}
              index={route.index}
              path={route.path}
              element={route.element}
            />
          ))}
        </Route>
      </Route>

      <Route element={<AuthenticatedRoute />}>
        <Route path="/" element={<MainLayout />}>
          {AuthenticatedRoutes.map((route, i) => (
            <Route
              key={i}
              index={route.index}
              path={route.path}
              element={route.element}
            />
          ))}
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

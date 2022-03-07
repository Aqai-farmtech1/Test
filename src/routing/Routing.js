import React, { Component } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Dashboard from "../pages/dasboard/Dashboard";
import FarmGoatList from "../pages/farm list goat wise/FarmGoatList";
import FarmInfo from "../pages/farm info/FarmInfo";
import Login from "../pages/login/Login";
import CreateFarm from "../pages/create farm/CreateFarm";
import AuthenticatedRoute from "../components/wrapper/AuthenticatedRoute";
import PageNotFound from "../pages/error 404/PageNotFound";
// import PageInfoProvider from "../contexts/PageInfoContext";
import GoatInfo from "../pages/goat info/GoatInfo";
import FarmList from "../pages/farm list/FarmList";
import DeviceList from "../pages/device/DeviceList";
import CheckYourMail from "../pages/forgetpassword/CheckYourMail";
import ForgetPassword from "../pages/forgetpassword/ForgetPassword";

import PrivateRoute from "./PrivateRoute.js";
import PublicRoute from "./PublicRoute.js";

// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import MainLayout from "./components/layout/MainLayout";

import "antd/dist/antd.css";
// import Login from "pages/login/Login";
// import AuthenticatedRoute from "./components/wrapper/AuthenticatedRoute";
// import PageNotFound from "./pages/error 404/PageNotFound";
// import PageInfoProvider from "./contexts/PageInfoContext";


import PageInfoContext from '../contexts/PageInfoContext';

// export const authenticatedroutes = [
//   {
//     path: "/dashboard",
//     component: <Dashboard />,
//     title: "Acgromalin | Dashboard",
//   },
//   {
//     path: "/farm",
//     component: <FarmList />,
//     title: "Acgromalin | Farm List",
//   },
//   {
//     path: "/farm/:farmid",
//     component: <FarmInfo />,
//     title: "Acgromalin | Farm Info",
//   },
//   {
//     path: "/farm/:farmid/:goatid",
//     component: <GoatInfo />,
//     title: "Acgromalin | Goat Info",
//   },
//   {
//     path: "farm/create",
//     component: <CreateFarm />,
//     title: "Acgromalin | Create Farm",
//   },
//   {
//     path: "/goat",
//     component: <FarmGoatList />,
//     title: "Acgromalin | Farm Goat List",
//   },
//   {
//     path: "/device",
//     component: <DeviceList />,
//     title: "Acgromalin | Device List",
//   }
// ];


export const privateroutes = [
  {
    "name": "Dashboard",
    "path": "dashboard",
    "component": <Dashboard />,
    "title": "Acgromalin | Dashboard",
    "icon": "fas fa-tv",
    "provider": PageInfoContext,
  }, {
    "name": "Farm",
    "path": "farm",
    "component": <FarmList />,
    "title": "Acgromalin | Farm",
    "icon": "fas fa-address-card",
    "provider": PageInfoContext,
  }, {
    "name": "Farm",
    "path": "createfarm",
    "component": <CreateFarm />,
    "title": "Acgromalin | Create Farm",
    "icon": "fas fa-address-card",
    "provider": PageInfoContext,
  }, {
    "name": "Farm",
    "path": "farm/:farmid",
    "component": <FarmInfo />,
    "title": "Acgromalin | Farm Info",
    "icon": "fas fa-address-card",
    "provider": PageInfoContext,
  }, {
    "name": "Farm",
    "path": "farm/:farmid/:goatid",
    "component": <FarmInfo />,
    "title": "Acgromalin | Goat Info",
    "icon": "fas fa-address-card",
    "provider": PageInfoContext,
  }, {
    "name": "Farm",
    "path": "goat",
    "component": <FarmGoatList />,
    "title": "Acgromalin | Farm Goat List",
    "icon": "fas fa-address-card",
    "provider": PageInfoContext,
  }, {
    "name": "Farm",
    "path": "device",
    "component": <DeviceList />,
    "title": "Acgromalin | Device List",
    "icon": "fas fa-address-card",
    "provider": PageInfoContext,
  }
]

export const publicroutes = [
  {
    "name": "Login",
    "path": "",
    "component": <Login />,
    "title": "Acgromalin | Login",
    "icon": "fas fa-address-card",
    "provider": PageInfoContext,
  }, {
    "name": "Login",
    "path": "forgetpassword",
    "component": <ForgetPassword />,
    "title": "Acgromalin | ForgetPassword",
    "icon": "fas fa-address-card",
    "provider": PageInfoContext,
  }, {
    "name": "Login",
    "path": "checkyourmail",
    "component": <CheckYourMail />,
    "title": "Acgromalin | Check Your Mail",
    "icon": "fas fa-address-card",
    "provider": PageInfoContext,
  }
];

class Routing extends Component {
  render() {
    return (
      <BrowserRouter>
        {/* <Routes> */}
        {
          publicroutes.map((routes) => {
            return <PublicRoute key={routes.path} path={routes.path} provider={routes.provider} element={routes.component} />;
          })
        }
        {
          privateroutes.map((routes) => {
            console.log('Provider chcekc', routes.provider);
            return <PrivateRoute key={routes.path} path={routes.path} provider={routes.provider} element={routes.component} />;
          })
        }

        {/* <Navigate from="*" to="/" /> */}
        {/* </Routes> */}
      </BrowserRouter>
    )
  }
}

export default Routing;
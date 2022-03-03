import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Dashboard from "../pages/dasboard/Dashboard";
import FarmGoatList from "../pages/farm list goat wise/FarmGoatList";
import FarmInfo from "../pages/farm info/FarmInfo";
import Login from "../pages/login/Login";
import CreateFarm from "../pages/create farm/CreateFarm";
import AuthenticatedRoute from "../components/wrapper/AuthenticatedRoute";
import PageNotFound from "../pages/error 404/PageNotFound";
import PageInfoProvider from "../contexts/PageInfoContext";
import GoatInfo from "../pages/goat info/GoatInfo";
import FarmList from "../pages/farm list/FarmList";
import DeviceList from "../pages/device/DeviceList";



import SectionContext from "context/SectionContext";
import StandardContext from "context/StandardContext";
import AcademicyearContext from "context/AcademicyearContext";
import FeesContext from "context/FeesContext";
import StudentContext from "context/StudentContext";
import ParentContext from "context/ParentContext";
import DashboardContext from "context/DashboardContext";
import PaymentsContext from "context/PaymentsContext";
import StudentwisereportContext from "context/StudentwisereportContext";
import ClasswisereportContext from "context/ClasswisereportContext";
import SmsContext from "context/SmsContext";



export const authenticatedroutes = [
  {
    path: "/dashboard",
    component: <Dashboard />,
    title: "Acgromalin | Dashboard",
  },
  {
    path: "/farm",
    component: <FarmList />,
    title: "Acgromalin | Farm List",
  },
  {
    path: "/farm/:farmid",
    component: <FarmInfo />,
    title: "Acgromalin | Farm Info",
  },
  {
    path: "/farm/:farmid/:goatid",
    component: <GoatInfo />,
    title: "Acgromalin | Goat Info",
  },
  {
    path: "farm/create",
    component: <CreateFarm />,
    title: "Acgromalin | Create Farm",
  },
  {
    path: "/goat",
    component: <FarmGoatList />,
    title: "Acgromalin | Farm Goat List",
  },
  {
    path: "/device",
    component: <DeviceList />,
    title: "Acgromalin | Device List",
  }
];


export const privateroutes = [
  {
    "name": "Dashboard",
    "path": "/dashboard",
    "component": Dashboard,
    "title": "Acgromalin | Dashboard",
    "icon": "fas fa-tv",
    "provider": DashboardContext,
  }, {
    "name": "Farm",
    "path": "/farm",
    "component": Farm,
    "title": "Acgromalin | Farm",
    "icon": "fas fa-address-card",
    "provider": FarmContext,
  }, {
    "name": "Farm",
    "path": "/farm/:farmid",
    "component": FarmInfo,
    "title": "Acgromalin | Farm Info",
    "icon": "fas fa-address-card",
    "provider": FarmContext,
  }, {
    "name": "Farm",
    "path": "/farm/:farmid/:goatid",
    "component": FarmInfo,
    "title": "Acgromalin | Goat Info",
    "icon": "fas fa-address-card",
    "provider": FarmContext,
  }, {
    "name": "Farm",
    "path": "/farm/create",
    "component": CreateFarm,
    "title": "Acgromalin | Create Farm",
    "icon": "fas fa-address-card",
    "provider": FarmContext,
  }, {
    "name": "Farm",
    "path": "/goat",
    "component": FarmGoatList,
    "title": "Acgromalin | Farm Goat List",
    "icon": "fas fa-address-card",
    "provider": GoatContext,
  }, {
    "name": "Farm",
    "path": "/device",
    "component": DeviceList,
    "title": "Acgromalin | Device List",
    "icon": "fas fa-address-card",
    "provider": DeviceContext,
  }
]

export const publicroutes = [
  {
    "name": "Login",
    "path": "/admin",
    "component": Login,
    "title": "Little star school | Login",
    "provider": ParentContext,
  }, {
    "name": "Parent Login",
    "path": "/",
    "component": Parentlogin,
    "title": "Little star school | Login",
    "provider": ParentContext,
  }, {
    "name": "Payment List",
    "path": "/paymentlist",
    "component": Paymentlist,
    "title": "Little star school | Login",
    "provider": ParentContext,
  }, {
    "name": "Payment Description",
    "path": "/paymentdescription/:id",
    "component": Paymentdescription,
    "title": "Little star school | Login",
    "provider": ParentContext,
  }, {
    "name": "My payments",
    "path": "/mypayments",
    "component": Mypayments,
    "title": "Little star school | Login",
    "provider": ParentContext,
  }, {
    "name": "Payment Success",
    "path": "/paymentsuccess/:paymentID",
    "component": Paymentsuccess,
    "title": "Little star school | Payment Success",
    "provider": ParentContext,
  }
]


class Routing extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>


          {
            publicroutes.map((routes) => {
              return <PublicRoute key={routes.path} path={routes.path} provider={routes.provider} component={routes.component} exact />;
            })
          }
          {
            privateroutes.map((routes) => {
              console.log('Provider chcekc', routes.provider);
              return <PrivateRoute key={routes.path} path={routes.path} provider={routes.provider} component={routes.component} exact />;
            })
          }

          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Routing;
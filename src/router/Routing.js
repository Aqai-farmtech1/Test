import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginRoute from "./LoginRoute";
import CheckYourMail from "../pages/forgetpassword/CheckYourMail";
import ForgetPassword from "../pages/forgetpassword/ForgetPassword";
import Login from "../pages/login/Login";
import LoginLayout from "../components/layout/login layout/LoginLayout";
import FarmList from "../pages/farm list/FarmList";
import CreateFarm from "../pages/create farm/CreateFarm";
import AuthenticatedRoute from "./AuthenticatedRoute";
import MainLayout from "../components/layout/mainlayout/MainLayout";
import FarmInfo from "../pages/farm info/FarmInfo";
import GoatList from "../pages/goatlist/GoatList";
import GoatInfo from "../pages/goat info/GoatInfo";
import FarmGoatList from "../pages/farm list goat wise/FarmGoatList";
import DeviceList from "../pages/device/DeviceList";
import EditFarm from "../pages/edit farm/EditFarm";
import PageNotFound from "../pages/error 404/PageNotFound";
import TransactionList from "../pages/transactionlist/TransactionList";
import CreateSalesOrder from "../pages/createsaleorder/CreateSalesOrder";
import CreatePurchaseOrder from "../pages/createpurchaseorder/CreatePurchaseOrder";
import CreateTransferOrder from "../pages/createtransfer/CreateTransfer";

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
  {
    element: <TransactionList />,
    path: "transactions",
  },
  {
    element: <CreateSalesOrder />,
    path: "transactions/sales/create",
  },
  {
    element: <CreatePurchaseOrder />,
    path: "transactions/purchase/create",
  },
  {
    element: <CreateTransferOrder />,
    path: "transactions/transfer/create",
  },
];

export default function Routing() {
  return (
    <Routes>
      <Route path="/login" element={<LoginLayout />}>
        <Route element={<LoginRoute />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="forgetpassword" element={<ForgetPassword />} />
        <Route path="checkmail" element={<CheckYourMail />} />
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

import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

import "antd/dist/antd.css";
import Dashboard from "./pages/dasboard/Dashboard";
import FarmGoatList from "./pages/farm list goat wise/FarmGoatList";
import FarmInfo from "./pages/farm info/FarmInfo";
import Login from "./pages/login/Login";
import CreateFarm from "./pages/create farm/CreateFarm";
import AuthenticatedRoute from "./components/wrapper/AuthenticatedRoute";
import PageNotFound from "./pages/error 404/PageNotFound";
import PageInfoProvider from "./contexts/PageInfoContext";
import GoatInfo from "./pages/goat info/GoatInfo";
import FarmList from "./pages/farm list/FarmList";
import DeviceList from "./pages/device/DeviceList";

function App() {
  return (
    <>
      <PageInfoProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />

          <Route element={<AuthenticatedRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<FarmList />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="farm" element={<FarmList />} />
              <Route path="farm/:farmid" element={<FarmInfo />} />
              <Route path="farm/:farmid/:goatid" element={<GoatInfo />} />
              <Route path="farm/create" element={<CreateFarm />} />
              <Route path="goat" element={<FarmGoatList />} />
              <Route path="device" element={<DeviceList />} />
            </Route>
          </Route>
        </Routes>
      </PageInfoProvider>
    </>
  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

import "antd/dist/antd.css";
import Dashboard from "./pages/dasboard/Dashboard";
import FarmList from "./pages/farm list/FarmList";
import FarmInfo from "./pages/farm info/FarmInfo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="farm" element={<FarmList />} />
        <Route path="farm/:farmid" element={<FarmInfo />} />
      </Route>
    </Routes>
  );
}

export default App;

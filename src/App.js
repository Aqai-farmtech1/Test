import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

import "antd/dist/antd.css";
import Dashboard from "./pages/dasboard/Dashboard";
import FarmList from "./pages/farm list/FarmList";
import FarmInfo from "./pages/farm info/FarmInfo";
import Login from "./pages/login/Login";
import Transaction from "./pages/transaction/Transaction";
import Report from "./pages/report/Report";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="farm" element={<FarmList />} />
        <Route path="farm/:farmid" element={<FarmInfo />} />
        <Route path="transaction" element={<Transaction />} />
        <Route path="report" element={<Report />} />
      </Route>
    </Routes>
  );
}

export default App;

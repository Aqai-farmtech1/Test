import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function LoginRoute() {
  const token = localStorage.getItem("token");

  return <>{!token ? <Outlet /> : <Navigate to="/" />} </>;
}

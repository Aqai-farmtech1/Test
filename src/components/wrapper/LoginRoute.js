import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function LoginRoute() {
  const { token } = useAuth();
  return <>{!token ? <Outlet /> : <Navigate to="/" />} </>;
}
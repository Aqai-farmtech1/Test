import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthenticatedRoute() {
  const isAuth = true;
  return <div>{isAuth ? <Outlet /> : <Navigate to="/login" />}</div>;
}

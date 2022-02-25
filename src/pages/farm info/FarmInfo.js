import React from "react";
import { useLocation } from "react-router-dom";
import "./farminfo.css";

export default function FarmInfo() {
  const location = useLocation();
  const { state } = location;
  return <div>{state.farmcode}</div>;
}

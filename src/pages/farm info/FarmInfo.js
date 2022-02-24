import React from "react";
import { useLocation } from "react-router-dom";
import "./farminfo.css";

export default function FarmInfo() {
  const location = useLocation();
  console.log(location);
  return <div>FarmInfo</div>;
}

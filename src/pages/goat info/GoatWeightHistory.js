import { Divider } from "antd";
import React from "react";
import "./goatinfo.css";
import GoatWeightHistoryCard from "./GoatWeightHistoryCard";

export default function GoatWeightHistory() {
  return (
    <div className="goat_weight_history_main">
      <div className="goat_weight_history_title_container">
        <div className="goat_weight_history_title">Weight History</div>
        <Divider />
      </div>
      <div className="goat_weight_history_container">
        <GoatWeightHistoryCard />
      </div>
    </div>
  );
}

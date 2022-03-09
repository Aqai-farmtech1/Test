import { Divider } from "antd";
import React from "react";
import "./goatinfo.css";
import GoatWeightHistoryCard from "./GoatWeightHistoryCard";

export default function GoatWeightHistory({ goatData }) {
  // console.log(goatData);
  return (
    <div className="goat_weight_history_main">
      <div className="goat_weight_history_title_container">
        <div className="goat_weight_history_title">Weight History</div>
        <Divider />
      </div>
      <div className="goat_weight_history_container">
        {goatData.weight_history &&
          goatData.weight_history.map((el) => (
            <GoatWeightHistoryCard key={el.id} weightData={el} />
          ))}
      </div>
    </div>
  );
}

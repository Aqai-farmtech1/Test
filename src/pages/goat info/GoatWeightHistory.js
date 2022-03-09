import { Divider, Skeleton } from "antd";
import React from "react";
import "./goatinfo.css";
import GoatWeightHistoryCard from "./GoatWeightHistoryCard";

export default function GoatWeightHistory({ goatData, isLoading }) {
  // console.log(goatData);
  return (
    <div className="goat_weight_history_main">
      <div className="goat_weight_history_title_container">
        <div className="goat_weight_history_title">Weight History</div>
        <Divider />
      </div>
      <div className="goat_weight_history_container">
        {isLoading ? (
          <>
            <div
              className="skeleton_goat_weight_history"
              style={{ display: "flex" }}
            >
              <Skeleton.Avatar
                active
                style={{ width: "70px", height: "70px" }}
                size={"large"}
              ></Skeleton.Avatar>
              <Skeleton
                active
                style={{ marginLeft: "20px" }}
                paragraph={{ rows: 2 }}
              ></Skeleton>
            </div>
            <div
              className="skeleton_goat_weight_history"
              style={{ display: "flex" }}
            >
              <Skeleton.Avatar
                active
                style={{ width: "70px", height: "70px" }}
                size={"large"}
              ></Skeleton.Avatar>
              <Skeleton
                active
                style={{ marginLeft: "20px" }}
                paragraph={{ rows: 2 }}
              ></Skeleton>
            </div>
            <div
              className="skeleton_goat_weight_history"
              style={{ display: "flex" }}
            >
              <Skeleton.Avatar
                active
                style={{ width: "70px", height: "70px" }}
                size={"large"}
              ></Skeleton.Avatar>
              <Skeleton
                active
                style={{ marginLeft: "20px" }}
                paragraph={{ rows: 2 }}
              ></Skeleton>
            </div>
            <div
              className="skeleton_goat_weight_history"
              style={{ display: "flex" }}
            >
              <Skeleton.Avatar
                active
                style={{ width: "70px", height: "70px" }}
                size={"large"}
              ></Skeleton.Avatar>
              <Skeleton
                active
                style={{ marginLeft: "20px" }}
                paragraph={{ rows: 2 }}
              ></Skeleton>
            </div>
          </>
        ) : (
          <>
            {goatData.weight_history &&
              goatData.weight_history.map((el) => (
                <GoatWeightHistoryCard key={el.id} weightData={el} />
              ))}
          </>
        )}
      </div>
    </div>
  );
}

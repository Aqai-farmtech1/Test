import React from "react";
import "./createsalesorder.css";

export default function ViewOrderListItem({ title, value }) {
  return (
    <div className="view_order_list_item">
      <h1>{title}</h1>
      <h2>{value}</h2>
    </div>
  );
}

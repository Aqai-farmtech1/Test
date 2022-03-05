import { Col, Row } from "antd";
import React from "react";
import ProductCard from "./ProductCard";
import "./farminfo.css";

export default function FarmDashboard() {
  return (
    <div className="farm_dashboard_main">
      <Row style={{ width: "100%" }}>
        <Col span={6}>
          <ProductCard />
        </Col>
      </Row>
    </div>
  );
}

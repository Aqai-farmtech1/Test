import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import tryCatch from "../../helper/tryCatch.helper";
import "./farminfo.css";
import { getFarm } from "../../api/farm.api";
import { useParams } from "react-router-dom";

export default function FarmDashboard({ farmDetails, isLoading }) {
  const [farmData, setFarmData] = useState({});
  const { farmid } = useParams();

  return (
    <div className="farm_dashboard_main">
      <Row style={{ width: "100%" }}>
        <Col span={6}>
          <ProductCard
            isLoading={isLoading}
            productDetail={{
              capacity: farmDetails.goat_capacity?.length
                ? farmDetails.goat_capacity[0].capacity
                : 0,
              total_goats: farmDetails.total_goats,
              total_goats_weight: farmDetails.total_goats_weight,
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

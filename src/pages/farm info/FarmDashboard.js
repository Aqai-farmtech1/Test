import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import tryCatch from "../../helper/tryCatch.helper";
import "./farminfo.css";
import { getFarm } from "../../api/farm.api";
import { useParams } from "react-router-dom";

export default function FarmDashboard() {
  const [farmData, setFarmData] = useState({});
  const { farmid } = useParams();

  const getFarmInfo = async () => {
    const [farmResponse, farmError] = await tryCatch(getFarm(farmid));

    if (!farmError) {
      setFarmData(farmResponse.data);
    } else {
      console.log(farmError.response);
    }
  };

  useEffect(() => {
    // getFarmInfo();
  }, []);

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

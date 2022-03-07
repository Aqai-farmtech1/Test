import React from "react";
import "./goatinfo.css";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import { Col, Row } from "antd";
import GoatBasicInfo from "./GoatBasicInfo";

export default function GoatInfo() {
  return (
    <div className="farm_info_main">
      <BreadCrumb />
      <div className="farm_info_details_main">
        <Row gutter={20} style={{ width: "100%" }}>
          <Col span={9}>
            <GoatBasicInfo />
          </Col>
          <Col span={9}>
            <div className="goat_weight_history"></div>
          </Col>
          <Col span={6}>
            <div className="goat_info_navigation"></div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

import { Col, Row } from "antd";
import React from "react";
import "./farminfo.css";

export default function FarmBasicInfoContent({ title, value }) {
  return (
    <div className="farm_basic_info_content">
      <Row style={{ width: "100%" }}>
        <Col span={8}>
          <div className="farm_basic_info_content_title">{title}</div>
        </Col>
        <Col span={16}>
          <div className="farm_basic_info_content_value">{value}</div>
        </Col>
      </Row>
    </div>
  );
}

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import { Row, Col } from "antd";
import "./farminfo.css";
import FarmInfoDetails from "./FarmInfoDetails";
import FarmInfoContent from "./FarmInfoContent";
import usePageInfo from "../../hooks/usePageInfo";

export default function FarmInfo() {
  const { setPageTitle } = usePageInfo();
  const params = useParams();

  useEffect(() => {
    setPageTitle("Red Hills Farm");
  });

  return (
    <>
      <BreadCrumb />
      <div className="farm_info">
        <Row gutter={30}>
          <Col span={18}>
            <FarmInfoContent />
          </Col>
          <Col span={6}>
            <FarmInfoDetails />
          </Col>
        </Row>
      </div>
    </>
  );
}

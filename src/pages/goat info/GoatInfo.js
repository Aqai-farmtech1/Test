import React, { useEffect } from "react";
import "./goatinfo.css";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import { Col, Row } from "antd";
import GoatBasicInfo from "./GoatBasicInfo";
import GoatWeightHistory from "./GoatWeightHistory";
import tryCatch from "../../helper/tryCatch.helper";
import { getGoatInfo } from "../../api/goat.api";
import { useParams } from "react-router-dom";

export default function GoatInfo() {
  const { goatid } = useParams();

  const getGoatDetails = async () => {
    const [goatResponse, goatError] = await tryCatch(getGoatInfo(goatid));

    if (!goatError) {
      console.log(goatResponse);
    } else {
      console.log(goatError);
    }
  };

  useEffect(() => {
    getGoatDetails();
  }, []);

  return (
    <div className="farm_info_main">
      <BreadCrumb />
      <div className="farm_info_details_main">
        <Row gutter={20} style={{ width: "100%" }}>
          <Col span={9}>
            <GoatBasicInfo />
          </Col>
          <Col span={9}>
            <div className="goat_weight_history">
              <GoatWeightHistory />
            </div>
          </Col>
          <Col span={6}>
            <div className="goat_info_navigation"></div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

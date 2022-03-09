import React, { useEffect, useState } from "react";
import "./goatinfo.css";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import { Col, Row } from "antd";
import GoatBasicInfo from "./GoatBasicInfo";
import GoatWeightHistory from "./GoatWeightHistory";
import tryCatch from "../../helper/tryCatch.helper";
import { getGoatInfo } from "../../api/goat.api";
import { useParams } from "react-router-dom";

export default function GoatInfo() {
  const [goatData, setGoatData] = useState({});
  const [isLoading, setIsLoading] = useState();
  const { goatid, farmid } = useParams();

  const getGoatDetails = async () => {
    setIsLoading(true);
    const [goatResponse, goatError] = await tryCatch(
      getGoatInfo(goatid, farmid)
    );

    if (!goatError) {
      setIsLoading(false);
      console.log(goatResponse.data);
      setGoatData(goatResponse.data);
    } else {
      setIsLoading(false);
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
          <Col style={{ display: "table-cell" }} span={8}>
            <GoatBasicInfo isLoading={isLoading} goatData={goatData} />
          </Col>
          <Col span={9}>
            <div className="goat_weight_history">
              <GoatWeightHistory isLoading={isLoading} goatData={goatData} />
            </div>
          </Col>
          <Col style={{ display: "table-cell" }} span={7}>
            <div className="goat_info_navigation"></div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

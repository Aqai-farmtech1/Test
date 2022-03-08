import React from "react";
import "./goatinfo.css";
import { goatInfoImage, weightIcon } from "../../utils/constants";
import GoatWeightDiffCard from "./GoatWeightDiffCard";
import { Divider } from "antd";

export default function GoatBasicInfo({ goatData }) {
  const inDate = new Date(goatData.in_date);
  const enterDate = `${("0" + inDate.getDate()).slice(-2)}/${(
    "0" +
    (Number(inDate.getMonth()) + 1)
  ).slice(-2)}/${inDate.getFullYear()}`;

  return (
    <div className="goat_basic_info">
      <div className="goat_basic_info_head">
        <div className="goat_basic_info_head_status_container">
          <div className="goat_basic_info_head_status">Ready to Sale</div>
        </div>
        <div className="goat_basic_info_head_image_wrapper">
          <img
            className="goat_basic_info_head_image"
            src={goatInfoImage}
            alt={"goat_info_image"}
          />
        </div>
        <div className="goat_info_rfid">{goatData.rfid}</div>
        <div className="goat_info_basic_weight">
          <div className="goat_info_basic_weight_info">
            <img src={weightIcon} alt="weight" />
            <h1>{goatData.current_weight}Kg</h1>
          </div>
          <GoatWeightDiffCard
            weightDifference={goatData.weight_difference}
            shrinkage={false}
          />
        </div>
      </div>
      <div className="goat_basic_info_body">
        <div className="goat_basic_info_body_content_container">
          <div className="goat_basic_info_body_content_title">Farm</div>
          <div className="goat_basic_info_body_content_value">
            Red Hills Farm
          </div>
        </div>
        <Divider className="goat_basic_info_divider" />
        <div className="goat_basic_info_body_content_container">
          <div className="goat_basic_info_body_content_title">Enter Date</div>
          <div className="goat_basic_info_body_content_value">{enterDate}</div>
        </div>
        <Divider className="goat_basic_info_divider" />
        <div className="goat_basic_info_body_content_container">
          <div className="goat_basic_info_body_content_title">Breed</div>
          <div className="goat_basic_info_body_content_value">-</div>
        </div>
        <Divider className="goat_basic_info_divider" />
        <div className="goat_basic_info_body_content_container">
          <div className="goat_basic_info_body_content_title">Tooth Count</div>
          <div className="goat_basic_info_body_content_value">-</div>
        </div>
        <Divider className="goat_basic_info_divider" />
        <div className="goat_basic_info_body_content_container">
          <div className="goat_basic_info_body_content_title">
            Vaccination Status
          </div>
          <div className="goat_basic_info_body_content_value">-</div>
        </div>
        <Divider className="goat_basic_info_divider" />
        <div className="goat_basic_info_body_content_container">
          <div className="goat_basic_info_body_content_title">Grade</div>
          <div className="goat_basic_info_body_content_value">-</div>
        </div>
        <Divider className="goat_basic_info_divider" />
        <div className="goat_basic_info_body_content_container">
          <div className="goat_basic_info_body_content_title">Period</div>
          <div className="goat_basic_info_body_content_value">
            {goatData.total_days} Day
          </div>
        </div>
        <Divider className="goat_basic_info_divider" />
        <div className="goat_basic_info_body_content_container">
          <div className="goat_basic_info_body_content_title">Sex</div>
          <div className="goat_basic_info_body_content_value">-</div>
        </div>
      </div>
    </div>
  );
}

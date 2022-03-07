import React from "react";
import "./goatinfo.css";
import { goatInfoImage, weightIcon } from "../../utils/constants";
import GoatWeightDiffCard from "./GoatWeightDiffCard";
import { Divider } from "antd";

export default function GoatBasicInfo() {
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
        <div className="goat_info_rfid">E28011702000136480120AA1</div>
        <div className="goat_info_basic_weight">
          <div className="goat_info_basic_weight_info">
            <img src={weightIcon} alt="weight" />
            <h1>20Kg</h1>
          </div>
          <GoatWeightDiffCard weight="1.2" shrinkage={false} />
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
          <div className="goat_basic_info_body_content_title">Farm</div>
          <div className="goat_basic_info_body_content_value">
            Red Hills Farm
          </div>
        </div>
        <Divider className="goat_basic_info_divider" />
        <div className="goat_basic_info_body_content_container">
          <div className="goat_basic_info_body_content_title">Farm</div>
          <div className="goat_basic_info_body_content_value">
            Red Hills Farm
          </div>
        </div>
        <Divider className="goat_basic_info_divider" />
        <div className="goat_basic_info_body_content_container">
          <div className="goat_basic_info_body_content_title">Farm</div>
          <div className="goat_basic_info_body_content_value">
            Red Hills Farm
          </div>
        </div>
        <Divider className="goat_basic_info_divider" />
        <div className="goat_basic_info_body_content_container">
          <div className="goat_basic_info_body_content_title">Farm</div>
          <div className="goat_basic_info_body_content_value">
            Red Hills Farm
          </div>
        </div>
      </div>
    </div>
  );
}

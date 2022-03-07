import React from "react";
import "./goatinfo.css";
import { goatInfoImage } from "../../utils/constants";

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
      </div>
    </div>
  );
}

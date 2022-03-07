import React from "react";
import "./farminfo.css";
import { editIcon } from "../../utils/constants";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import FarmBasicInfoContent from "./FarmBasicInfoContent";

export default function FarmInfoBasicDetail() {
  return (
    <div className="farm_information_basic_info_container">
      <div className="farm_information_basic">
        <div className="farm_information_basic_head_area">
          <div className="farm_information_basic_head_title">Basic Info</div>
          <NavLink to={`/farm/create`}>
            <Button
              className="user_list_buttons"
              style={{ borderRadius: "4px" }}
              block
              type="primary"
              ghost
            >
              <img className="button_icon" src={editIcon} alt="edit icon" />
              Edit
            </Button>
          </NavLink>
        </div>
        <FarmBasicInfoContent title={"Farm Type"} value={"Ajith Abinash"} />
        <FarmBasicInfoContent title={"Farm Code"} value={"Ajith Abinash"} />
        <FarmBasicInfoContent title={"Latitude"} value={"Ajith Abinash"} />
        <FarmBasicInfoContent title={"Longitude"} value={"Ajith Abinash"} />
        <FarmBasicInfoContent title={"Product Type"} value={"Ajith Abinash"} />
      </div>
      <div className="farm_information_address">
        <div className="farm_information_basic_head_area">
          <div className="farm_information_basic_head_title">Address Info</div>
        </div>
        <FarmBasicInfoContent
          title={"Contact Number"}
          value={"Ajith Abinash"}
        />
        <FarmBasicInfoContent title={"Email Id"} value={"Ajith Abinash"} />
        <FarmBasicInfoContent title={"Address"} value={"Ajith Abinash"} />
        <FarmBasicInfoContent title={"City"} value={"Ajith Abinash"} />
        <FarmBasicInfoContent title={"State"} value={"Ajith Abinash"} />
        <FarmBasicInfoContent title={"Country"} value={"Ajith Abinash"} />
        <FarmBasicInfoContent title={"Pincode"} value={"Ajith Abinash"} />
      </div>
    </div>
  );
}

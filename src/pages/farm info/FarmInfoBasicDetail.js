import React from "react";
import "./farminfo.css";
import { editIcon } from "../../utils/constants";
import { NavLink } from "react-router-dom";
import { Button, Space, Skeleton } from "antd";
import FarmBasicInfoContent from "./FarmBasicInfoContent";

export default function FarmInfoBasicDetail({ farmDetails, isLoading }) {
  return (
    <div className="farm_information_basic_info_container">
      {isLoading ? (
        <>
          <Space size={40} direction="vertical">
            <Skeleton active style={{ width: "50%" }} />
            <Skeleton active style={{ width: "50%" }} />
            <Skeleton active style={{ width: "50%" }} />
          </Space>
        </>
      ) : (
        <>
          <div className="farm_information_basic">
            <div className="farm_information_basic_head_area">
              <div className="farm_information_basic_head_title">
                Basic Info
              </div>
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
            <FarmBasicInfoContent
              title={"Farm Type"}
              value={farmDetails.farm_type_name}
            />
            <FarmBasicInfoContent
              title={"Farm Code"}
              value={farmDetails.code}
            />
            <FarmBasicInfoContent
              title={"Latitude"}
              value={farmDetails.latitude}
            />
            <FarmBasicInfoContent
              title={"Longitude"}
              value={farmDetails.longitude}
            />
            <FarmBasicInfoContent
              title={"Product Type"}
              value={farmDetails.product_capacity
                .map((el) => [el.product_name, el.capacity].join("-"))
                .join(", ")}
            />
          </div>
          <div className="farm_information_address">
            <div className="farm_information_basic_head_area">
              <div className="farm_information_basic_head_title">
                Address Info
              </div>
            </div>
            <FarmBasicInfoContent
              title={"Contact Number"}
              value={farmDetails.phone_no}
            />
            <FarmBasicInfoContent
              title={"Email Id"}
              value={farmDetails.email}
            />
            <FarmBasicInfoContent
              title={"Address"}
              value={farmDetails.primary_address}
            />
            <FarmBasicInfoContent title={"City"} value={farmDetails.city} />
            <FarmBasicInfoContent
              title={"State"}
              value={farmDetails.state_name}
            />
            <FarmBasicInfoContent
              title={"Country"}
              value={farmDetails.country_name}
            />
            <FarmBasicInfoContent
              title={"Pincode"}
              value={farmDetails.pincode}
            />
          </div>
        </>
      )}
    </div>
  );
}

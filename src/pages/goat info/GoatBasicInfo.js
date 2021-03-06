import React from "react";
import "./goatinfo.css";
import { goatInfoImage, weightIcon } from "../../utils/constants";
import GoatWeightDiffCard from "./GoatWeightDiffCard";
import { Divider, Skeleton } from "antd";

export default function GoatBasicInfo({ goatData, isLoading }) {
  const inDate = new Date(goatData.in_date);
  const enterDate = inDate.toLocaleDateString();

  return (
    <div className="goat_basic_info">
      <div className="goat_basic_info_head">
        {isLoading ? (
          <>
            <Skeleton.Avatar
              size={"large"}
              style={{ width: "100px", height: "100px", marginTop: "20px" }}
              active
              shape="circle"
            ></Skeleton.Avatar>
            <Skeleton.Button
              active
              style={{ width: "350px", marginTop: "10px" }}
            ></Skeleton.Button>
            <Skeleton.Button
              active
              style={{ width: "150px", marginTop: "10px" }}
            ></Skeleton.Button>
          </>
        ) : (
          <>
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
                shrinkage={goatData.is_shrinkage}
              />
            </div>
          </>
        )}
      </div>
      <div className="goat_basic_info_body">
        {isLoading ? (
          <Skeleton
            style={{ marginTop: "20px" }}
            active
            paragraph={{ rows: 8 }}
          ></Skeleton>
        ) : (
          <>
            <div className="goat_basic_info_body_content_container">
              <div className="goat_basic_info_body_content_title">Farm</div>
              <div className="goat_basic_info_body_content_value">
                Red Hills Farm
              </div>
            </div>
            <Divider className="goat_basic_info_divider" />
            <div className="goat_basic_info_body_content_container">
              <div className="goat_basic_info_body_content_title">
                Enter Date
              </div>
              <div className="goat_basic_info_body_content_value">
                {enterDate}
              </div>
            </div>
            <Divider className="goat_basic_info_divider" />
            <div className="goat_basic_info_body_content_container">
              <div className="goat_basic_info_body_content_title">Breed</div>
              <div className="goat_basic_info_body_content_value">-</div>
            </div>
            <Divider className="goat_basic_info_divider" />
            <div className="goat_basic_info_body_content_container">
              <div className="goat_basic_info_body_content_title">
                Tooth Count
              </div>
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
          </>
        )}
      </div>
    </div>
  );
}

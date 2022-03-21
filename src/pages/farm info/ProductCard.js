import React from "react";
import "./farminfo.css";
import { productGoat } from "../../utils/constants";
import { Button, Divider, Skeleton } from "antd";
import { NavLink, useParams } from "react-router-dom";

export default function ProductCard({ productDetail, isLoading }) {
  const { farmid } = useParams();
  return (
    <div className="product_card_main">
      <div className="product_card_image_conatiner">
        {isLoading ? (
          <>
            <Skeleton.Avatar
              size={"large"}
              style={{ width: "70px", height: "70px", marginTop: "10px" }}
              active
              shape="circle"
            ></Skeleton.Avatar>
            <Skeleton.Button
              active
              style={{ width: "150px", height: "20px", marginTop: "10px" }}
            ></Skeleton.Button>
          </>
        ) : (
          <>
            <div className="product_image_wrapper">
              <img
                className="product_image"
                src={productGoat}
                alt="product_image"
              />
            </div>
            <div className="product_card_title">Goats</div>
          </>
        )}
      </div>

      {isLoading ? (
        <>
          <Skeleton.Button
            active
            style={{ width: "350px", height: "20px", marginTop: "20px" }}
          ></Skeleton.Button>
          <Skeleton.Button
            active
            style={{ width: "350px", height: "20px", marginTop: "10px" }}
          ></Skeleton.Button>
          <Skeleton.Button
            active
            style={{ width: "350px", height: "20px", marginTop: "10px" }}
          ></Skeleton.Button>
          <Skeleton.Button
            active
            style={{ width: "100px", height: "40px", marginTop: "10px" }}
          ></Skeleton.Button>
        </>
      ) : (
        <>
          <div className="product_card_details">
            <div className="product_card_details_title">Farm Capacity</div>
            <div className="product_card_details_content">
              {productDetail.capacity}
            </div>
          </div>
          <Divider className="product_card_details_divider" />
          <div className="product_card_details">
            <div className="product_card_details_title">Total Goats</div>
            <div className="product_card_details_content">
              {productDetail.total_goats}
            </div>
          </div>
          <Divider className="product_card_details_divider" />
          <div className="product_card_details">
            <div className="product_card_details_title">Total Weight</div>
            <div className="product_card_details_content">
              {" "}
              {productDetail.total_goats_weight} kg
            </div>
          </div>
          <div className="product_details_view_button_container">
            <NavLink to={`/farm/${farmid}/goat`}>
              <Button
                className="product_details_view_button"
                type="primary"
                block
              >
                View
              </Button>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
}

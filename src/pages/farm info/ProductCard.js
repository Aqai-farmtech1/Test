import React from "react";
import "./farminfo.css";
import { productGoat } from "../../utils/constants";
import { Button, Divider } from "antd";
import { NavLink } from "react-router-dom";

export default function ProductCard() {
  return (
    <div className="product_card_main">
      <div className="product_card_image_conatiner">
        <div className="product_image_wrapper">
          <img
            className="product_image"
            src={productGoat}
            alt="product_image"
          />
        </div>
        <div className="product_card_title">Goats</div>
      </div>
      <div className="product_card_details">
        <div className="product_card_details_title">Farm Capacity</div>
        <div className="product_card_details_content">1000</div>
      </div>
      <Divider className="product_card_details_divider" />
      <div className="product_card_details">
        <div className="product_card_details_title">Total Goats</div>
        <div className="product_card_details_content">800</div>
      </div>
      <Divider className="product_card_details_divider" />
      <div className="product_card_details">
        <div className="product_card_details_title">Total Weight</div>
        <div className="product_card_details_content">12000 kg</div>
      </div>
      <div className="product_details_view_button_container">
        <NavLink to="goat">
          <Button className="product_details_view_button" type="primary" block>
            View
          </Button>
        </NavLink>
      </div>
    </div>
  );
}

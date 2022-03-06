import React from "react";
import { Outlet } from "react-router-dom";
import { Row, Col } from "antd";
import { loginImage } from "../../../utils/constants";

export default function LoginLayout() {
  return (
    <Row>
      <Col span={12}>
        <div className="image_area">
          <img className="login_image" src={loginImage} alt="login" />
        </div>
      </Col>
      <Col span={12}>
        <div className="form_area">
          <Outlet />
        </div>
      </Col>
    </Row>
  );
}

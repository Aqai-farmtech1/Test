import React, { useState } from "react";
import { Form, Alert, Button, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./forgetpassword.css";

export default function ForgetPassword() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const finishHandler = () => {};

  return (
    <div className="forget_password_container">
      <div className="forget_password_title">Forgot Password</div>
      <Form
        name="forgot_password_farm_area"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={finishHandler}
      >
        <Form.Item
          className="username_input_form"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your Email!",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
            block
          >
            {!isLoading ? "Submit" : ""}
          </Button>
        </Form.Item>
        {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
      </Form>
    </div>
  );
}

import React, { useState } from "react";
import { Form, Input, Checkbox, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.css";
import tryCatch from "../../helper/tryCatch.helper";
import useAuth from "../../hooks/useAuth";
import { login } from "../../api/login.api";
import useMasters from "../../hooks/useMasters";
import { getStateList } from "../../api/master.api";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useAuth();
  const { fetchMasters } = useMasters();

  const handleFormSubmit = async (values) => {
    const { email, password } = values;
    setIsLoading(true);
    const [loginResponse, loginError] = await tryCatch(
      login({ email, password })
    );

    if (!loginError) {
      const token = loginResponse.data.token;
      localStorage.setItem("token", token);
      setIsLoading(false);
      fetchMasters(token);
      setToken(token);
    } else {
      const errorMessages = loginError.response.data;
      setErrorMessage(errorMessages);
      console.log(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="login_farm">
        <div className="login_title">Login</div>
        <div className="login_input_area">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={handleFormSubmit}
          >
            <Form.Item
              className="username_input_form"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email Required!",
                },
                {
                  type: "email",
                  message: "Invalid Email!",
                },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              className="password_input_form"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password?
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                loading={isLoading}
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
              >
                {!isLoading ? "Log in" : ""}
              </Button>
            </Form.Item>
            {/* {errorMessage?.length > 0 &&
              errorMessage.map((el, index) => (
                <Alert key={index} message={el} type="error" showIcon />
              ))} */}
          </Form>
        </div>
      </div>
    </>
  );
}

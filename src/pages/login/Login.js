import React, { useEffect, useState } from "react";
import { Form, Input, Checkbox, Button, message, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.css";
import tryCatch from "../../helper/tryCatch.helper";
// import useAuth from "../../hooks/useAuth";
import { login } from "../../api/login.api";
import useMasters from "../../hooks/useMasters";
import { useNavigate, NavLink } from "react-router-dom";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { fetchMasters } = useMasters();

  const handleFormSubmit = async (values) => {
    const { email, password } = values;
    setIsLoading(true);
    const [loginResponse, loginError] = await tryCatch(
      login({ email, password })
    );

    if (!loginError) {
      const { token, fullname, designation } = loginResponse.data;
      if (designation === 3) {
        setIsLoading(false);
        setErrorMessage("You are not Authorized!");
      } else {
        localStorage.setItem("token", token);
        setIsLoading(false);
        message.success({ content: `Welcome ${fullname}!` });
        fetchMasters(token);
        navigate("/farm");
      }
    } else {
      const errorMessages = loginError.response.data.error.message;
      setErrorMessage(errorMessages);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="login_farm">
        <h1 className="login_farm_title">Farm Management</h1>
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

              <NavLink to="/login/forgetpassword">
                <div className="login-form-forgot"> Forgot password? </div>
              </NavLink>
            </Form.Item>

            <Form.Item>
              <Button
                size="large"
                loading={isLoading}
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
              >
                {!isLoading ? "Log in" : ""}
              </Button>
            </Form.Item>
            {errorMessage && (
              <Alert message={errorMessage} type="error" showIcon />
            )}
          </Form>
        </div>
      </div>
      <div className="copyrights_text">Copyright ??2022 Aqgromalin.</div>
    </>
  );
}

import React from "react";
import { Row, Col, Form, Input, Checkbox, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.css";
import { loginImage } from "../../utils/constants";
import axios from "axios";
import tryCatch from "../../helper/tryCatch.helper";

export default function Login() {
  const handleFormSubmit = async (values) => {
    const { email, password, remember } = values;
    const [response, error] = await tryCatch(
      axios({
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/todos/1",
      })
    );
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <div className="image_area">
            <img className="login_image" src={loginImage} alt="login image" />
          </div>
        </Col>
        <Col span={12}>
          <div className="form_area">
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
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      block
                    >
                      Log in
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
            <div className="copyrights_text">
              Copyright ©2020 Produced by Ant Finance Experience Technology
              Department
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

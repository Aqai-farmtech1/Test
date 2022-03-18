import React, { useState } from "react";
import { Form, Alert, Button, Input, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { mailResetPassword } from "../../api/reset.api";
import "./forgetpassword.css";
import { useNavigate } from "react-router-dom";
import tryCatch from "../../helper/tryCatch.helper";

export default function ForgetPassword() {
  const [errorMessage, setErrorMessage] = useState("");
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async () => {
    const email = form.getFieldValue("email");
    setIsLoading(true);
    message.loading({
      content: "Processing...",
      key: "forgetPassword",
      duration: 0,
    });
    const [mailResponse, mailError] = await tryCatch(
      mailResetPassword({ email })
    );

    if (!mailError) {
      setIsLoading(false);
      message.success({
        content: "please Check your Mail...",
        key: "forgetPassword",
      });
      console.log(mailResponse.data);
      navigate("/login/checkmail");
    } else {
      setIsLoading(false);
      message.error({
        content: "Something Went Wrong!",
        key: "forgetPassword",
      });
      console.log(mailError.response);
    }
  };

  return (
    <div className="forget_password_container">
      <div className="forget_password_title">Forgot Password</div>
      <Form
        form={form}
        name="forgot_password_farm_area"
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

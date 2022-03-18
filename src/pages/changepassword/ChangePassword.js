import React from "react";
import { Form, Input, Button } from "antd";
import "./changepassword.css";

export default function ChangePassword() {
  const handleFormSubmit = async () => {};

  return (
    <div className="change_password_main">
      <h1>Change Password</h1>
      <Form
        style={{ width: "100%" }}
        layout="vertical"
        onFinish={handleFormSubmit}
      >
        <Form.Item
          className="create_password_form_item"
          name="current_password"
          rules={[
            { required: true, message: "Please enter current password!" },
          ]}
        >
          <Input.Password
            size="large"
            className="create_password_form_input"
            placeholder="Current Password"
          />
        </Form.Item>
        <Form.Item
          className="create_password_form_item"
          name="password"
          rules={[{ required: true, message: "Please enter new password!" }]}
        >
          <Input.Password
            size="large"
            className="create_password_form_input"
            placeholder="New Password"
          />
        </Form.Item>
        <Form.Item
          className="create_password_form_item"
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please input your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            className="create_password_form_input"
            placeholder="Confirm New Password"
          />
        </Form.Item>
        <Form.Item className="update_button_form_item">
          <Button
            className="create_password_form_button"
            type="primary"
            htmlType="submit"
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

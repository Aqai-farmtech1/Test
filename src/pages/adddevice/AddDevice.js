import React, { useState } from "react";
import { Form, Select, Input, Button, Switch } from "antd";
import "./adddevice.css";

const { Option } = Select;

export default function AddDevice({ activeToggle }) {
  const [isActive, setIsActive] = useState(true);

  const handleFormSubmit = () => {};

  return (
    <div className="add_device_main">
      <Form
        style={{ width: "100%" }}
        layout="vertical"
        onFinish={handleFormSubmit}
      >
        {activeToggle && (
          <Switch
            style={{ marginBottom: 16 }}
            checked={isActive}
            checkedChildren="Active"
            unCheckedChildren="In Active"
            onChange={() => setIsActive(!isActive)}
          />
        )}
        <Form.Item
          className="create_farm_form_item"
          name="producttype1"
          label="Product Type"
          rules={[{ required: true, message: "Please select Product!" }]}
          initialValue={["goat"]}
        >
          <Select disabled size="large" placeholder="Select Product">
            <Option value="goat">Goat</Option>
          </Select>
        </Form.Item>
        <Form.Item
          className="create_farm_form_item"
          name="farmname1"
          label="Farm Name"
          rules={[
            { required: true, message: "Please enter Farm Name" },
            {
              min: 3,
              message: "Farm Name is too short!",
            },
            {
              max: 50,
              message: "Farm Name is too long!",
            },
          ]}
        >
          <Input
            style={{ textTransform: "capitalize" }}
            size="large"
            placeholder="Enter your Farm Name here"
          />
        </Form.Item>
        <Form.Item
          className="create_farm_form_item"
          name="producttype"
          label="Product Type"
          rules={[{ required: true, message: "Please select Product!" }]}
          initialValue={["goat"]}
        >
          <Select disabled size="large" placeholder="Select Product">
            <Option value="goat">Goat</Option>
          </Select>
        </Form.Item>
        <Form.Item
          className="create_farm_form_item"
          name="farmname"
          label="Farm Name"
          rules={[
            { required: true, message: "Please enter Farm Name" },
            {
              min: 3,
              message: "Farm Name is too short!",
            },
            {
              max: 50,
              message: "Farm Name is too long!",
            },
          ]}
        >
          <Input
            style={{ textTransform: "capitalize" }}
            size="large"
            placeholder="Enter your Farm Name here"
          />
        </Form.Item>
        <Button
          className="create_farm_form_item_buttons"
          type="primary"
          htmlType="submit"
        >
          Add Machine
        </Button>
      </Form>
    </div>
  );
}

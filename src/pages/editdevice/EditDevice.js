import React, { useEffect, useState } from "react";
import { Form, Select, Input, Button, Switch, message } from "antd";
import "./editdevice.css";
import useMasters from "../../hooks/useMasters";
import tryCatch from "../../helper/tryCatch.helper";
import { createDevice } from "../../api/device.api";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

export default function EditDevice({
  activeToggle,
  setIsModalVisible,
  getDeviceList,
  deviceData,
}) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingDevice, setIsCreatingDevice] = useState(false);
  const [isActive, setIsActive] = useState(deviceData.status);
  // const [deviceDetails , setDeviceDetails] =useState(deviceData);
  const { deviceTypeMaster, farmMaster } = useMasters();

  const handleFormSubmit = async () => {};

  useEffect(() => {}, []);

  return (
    <div className="add_device_main">
      <Form
        form={form}
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
          name="device_name"
          label="Machine Name"
          rules={[
            { required: true, message: "Please enter Device Name!" },
            {
              min: 3,
              message: "Device Name is too short!",
            },
            {
              max: 50,
              message: "Device Name is too long!",
            },
          ]}
        >
          <Input size="large" placeholder="Enter Device Name" />
        </Form.Item>
        <Form.Item
          className="create_farm_form_item"
          name="farm_name"
          label="Farm"
          rules={[{ required: true, message: "Please select Farm!" }]}
        >
          <Select size="large" placeholder="Select Farm">
            {farmMaster.map((el) => (
              <Option key={el.id} value={el.id}>
                {el.farm_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          className="create_farm_form_item"
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please enter Password!" },
            {
              min: 3,
              message: "Password is too short!",
            },
            {
              max: 50,
              message: "Password is too long!",
            },
          ]}
        >
          <Input size="large" placeholder="Enter Device Password" />
        </Form.Item>
        <Button
          loading={isCreatingDevice}
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

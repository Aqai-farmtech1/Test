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

  const handleFormSubmit = async (value) => {
    // message.loading({
    //   content: "Creating Device...",
    //   key: "create_device",
    // duration : 0
    // });
    // setIsCreatingDevice(true);
    // const [deviceResponse, deviceError] = await tryCatch(createDevice(value));
    // if (!deviceError) {
    //   message.success({
    //     content: "Device created successfully!",
    //     key: "create_device",
    //   });
    //   form.resetFields();
    //   setIsModalVisible(false);
    //   setIsCreatingDevice(false);
    //   getDeviceList();
    // } else {
    //   setIsCreatingDevice(false);
    //   const obj = deviceError.response.data.error;
    //   for (const key in obj) {
    //     message.error({
    //       content: `${obj[key]}`,
    //       key: "create_device",
    //     });
    //   }
    // }
  };

  // useEffect(() => {
  //   form.setFieldsValue(deviceData);
  // }, [deviceData]);

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
          name="name"
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
          name="device_type"
          label="Machine Type"
          rules={[{ required: true, message: "Please select Device Type!" }]}
        >
          <Select size="large" placeholder="Select Device Type">
            {deviceTypeMaster.map((el) => (
              <Option key={el.id} value={el.id}>
                {el.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          className="create_farm_form_item"
          name="device_id"
          label="Machine Id"
          rules={[
            { required: true, message: "Please enter Device Id" },
            {
              min: 3,
              message: "Device Id is too short!",
            },
            {
              max: 50,
              message: "Device Id is too long!",
            },
          ]}
        >
          <Input
            style={{ textTransform: "capitalize" }}
            size="large"
            placeholder="Enter Device Id"
          />
        </Form.Item>
        <Form.Item
          className="create_farm_form_item"
          name="farm"
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
          name="frimware_version"
          label="Frimware Version"
          rules={[
            {
              min: 3,
              message: "Frimware Version is too short!",
            },
            {
              max: 50,
              message: "Frimware Version is too long!",
            },
          ]}
        >
          <Input size="large" placeholder="Enter Device Frimware" />
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

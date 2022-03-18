import React, { useEffect, useState } from "react";
import { Form, Select, Input, Button, Switch, message } from "antd";
import "./adddevice.css";
import useMasters from "../../hooks/useMasters";
import tryCatch from "../../helper/tryCatch.helper";
import { createDevice } from "../../api/device.api";
import usePageInfo from "../../hooks/usePageInfo";
import { formNameInputRestriction } from "../../utils/formInputRestriction";

const { Option } = Select;

export default function AddDevice({
  activeToggle,
  setIsModalVisible,
  refreshDeviceList,
}) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingDevice, setIsCreatingDevice] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const { deviceTypeMaster, farmMaster, fetchFarm } = useMasters();

  const handleFormSubmit = async (value) => {
    message.loading({
      content: "Creating Device...",
      key: "create_device",
      duration: 0,
    });
    setIsCreatingDevice(true);
    const [deviceResponse, deviceError] = await tryCatch(createDevice(value));

    if (!deviceError) {
      message.success({
        content: "Device created successfully!",
        key: "create_device",
      });
      form.resetFields();
      setIsModalVisible(false);
      setIsCreatingDevice(false);
      refreshDeviceList();
    } else {
      setIsCreatingDevice(false);
      const obj = deviceError.response.data.error;
      for (const key in obj) {
        message.error({
          content: `${obj[key]}`,
          key: "create_device",
        });
      }
    }
  };

  useEffect(() => {
    fetchFarm();
  }, []);

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
          label="Device Name"
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
          <Input
            onKeyDown={formNameInputRestriction}
            size="large"
            placeholder="Enter Device Name"
          />
        </Form.Item>
        <Form.Item
          className="create_farm_form_item"
          name="device_type"
          label="Device Type"
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
          name="farm"
          label="Farm"
          rules={[{ required: true, message: "Please select Farm!" }]}
        >
          <Select size="large" placeholder="Select Farm">
            {farmMaster.map((el) => (
              <Option key={el.id} value={el.id}>
                {el.farm_name}- {el.code}
              </Option>
            ))}
          </Select>
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

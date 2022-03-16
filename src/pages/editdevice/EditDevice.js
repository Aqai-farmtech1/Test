import React, { useEffect, useState } from "react";
import { Form, Select, Input, Button, Switch, message } from "antd";
import "./editdevice.css";
import useMasters from "../../hooks/useMasters";
import tryCatch from "../../helper/tryCatch.helper";
import {
  createDevice,
  updateDevice,
  updateDeviceStatus,
} from "../../api/device.api";
import { useNavigate } from "react-router-dom";
import usePageInfo from "../../hooks/usePageInfo";

const { Option } = Select;

export default function EditDevice({
  activeToggle,
  setIsEditModalVisible,
  refreshDeviceList,
  deviceData,
}) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingDevice, setIsCreatingDevice] = useState(false);
  const [isActive, setIsActive] = useState(deviceData.status);
  const [deviceDetails, setDeviceDetails] = useState(deviceData);
  const [isFormDataTouched, setIsFormDataTouched] = useState(false);
  const { farmMaster } = useMasters();

  const handleFormSubmit = async (value) => {
    setIsCreatingDevice(true);
    message.loading({
      content: "Updating Farm Details...",
      key: "editdevice",
      duration: 0,
    });
    const [deviceResponse, deviceError] = await tryCatch(
      updateDevice(deviceData.id, {
        farm: value.farm,
        name: value.device_name,
      })
    );
    if (!deviceError) {
      message.success({
        content: "Updating Device Details...",
        key: "editdevice",
      });
      form.resetFields();
      setIsEditModalVisible(false);
      setIsCreatingDevice(false);
      refreshDeviceList();
    } else {
      setIsCreatingDevice(false);
      const errors = deviceError.response.data.error;
      for (let err in errors) {
        const errorMessage = errors[err][0];
        message.error({ content: errorMessage, key: "editdevice" });
      }
    }
  };

  const handleToggleChange = async (value) => {
    const [deviceStatusResponse, deviceStatusError] = await tryCatch(
      updateDeviceStatus(deviceDetails.id)
    );
    if (!deviceStatusError) {
      message.success({
        content: "Updated Successfully!",
        duration: "0.3",
        key: "updateDeviceStatus",
      });
      refreshDeviceList();
      setIsActive(value);
    } else {
      const errors = deviceStatusError.response.data.error;
      for (let err in errors) {
        const errorMessage = errors[err][0];
        message.error({ content: errorMessage, key: "updateDeviceStatus" });
      }
    }
  };

  useEffect(() => {
    form.setFieldsValue(deviceDetails);
  }, [deviceData]);

  return (
    <div className="add_device_main">
      <Form
        form={form}
        style={{ width: "100%" }}
        layout="vertical"
        onFinish={handleFormSubmit}
        onChange={() => setIsFormDataTouched(true)}
      >
        {activeToggle && (
          <Switch
            style={{ marginBottom: 16 }}
            checked={isActive}
            checkedChildren="Active"
            unCheckedChildren="In Active"
            onChange={handleToggleChange}
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
          name="farm"
          label="Farm"
          rules={[{ required: true, message: "Please select Farm!" }]}
        >
          <Select
            onChange={() => setIsFormDataTouched(true)}
            size="large"
            placeholder="Select Farm"
          >
            {farmMaster.map((el) => (
              <Option key={el.id} value={el.id}>
                {el.farm_name} - {el.code}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Button
          loading={isCreatingDevice}
          className="create_farm_form_item_buttons"
          type="primary"
          htmlType="submit"
          disabled={!isFormDataTouched}
        >
          Update
        </Button>
      </Form>
    </div>
  );
}

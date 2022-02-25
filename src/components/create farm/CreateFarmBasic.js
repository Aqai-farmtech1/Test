import React from "react";
import "./createfarmbasic.css";
import { Row, Col, Form, Radio, Input, Select, InputNumber } from "antd";

const { Option } = Select;

export default function CreateFarmBasic() {
  const handleProductChange = () => {};

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const Demo = () => {
    const [form] = Form.useForm();
  };

  return (
    <>
      <Form layout="vertical" name="control-hooks" className="create_farm_form">
        <Form.Item name="radio-group" label="Farm Type">
          <Radio.Group>
            <Radio value="own">Own Farm</Radio>
            <Radio value="partner">Partner Farm</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="farmname"
          label="Farm Name"
          rules={[
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="farmcode"
          label="Farm Code"
          rules={[
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lattitude"
          label="Lattitude"
          rules={[
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="longitude"
          label="Longitude"
          rules={[
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="product" label="Product" rules={[{ required: true }]}>
          <Select
            placeholder="Select Product"
            onChange={handleProductChange}
            allowClear
          >
            <Option value="goat">Goat</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="capacity"
          label="Capacity"
          rules={[{ required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="machine"
          label="addmachine"
          rules={[{ required: true }]}
        >
          <Select
            mode="tags"
            size="medium"
            placeholder="Please select"
            defaultValue={["a10", "c12"]}
            style={{ width: "100%" }}
          >
            <Option>"adomsia"</Option>
          </Select>
        </Form.Item>
      </Form>
    </>
  );
}

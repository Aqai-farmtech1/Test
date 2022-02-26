import React from "react";
import "./createfarm.css";
import {
  Col,
  Form,
  Row,
  Input,
  Radio,
  Select,
  InputNumber,
  Button,
} from "antd";

const { Option } = Select;

export default function CreateFarmcontactInfo({
  setFormStepNo,
  formInputValues,
}) {
  const handleSubmit = (values) => {
    const inputValues = { ...formInputValues, ...values };
    console.log(inputValues);
  };

  return (
    <Form style={{ width: "100%" }} layout="vertical" onFinish={handleSubmit}>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            className="create_farm_form_item"
            name="address"
            label="Address"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Enter your Farm Name here" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className="create_farm_form_item"
            name="pincode"
            label="Pincode"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Enter your Farm Code here" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            className="create_farm_form_item"
            name="state"
            label="State"
            rules={[{ required: true }]}
          >
            <Select size="large" placeholder="Please select">
              <Option value="mac001">Mac001</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className="create_farm_form_item"
            name="city"
            label="City"
            rules={[{ required: true }]}
          >
            <Select size="large" placeholder="Please select">
              <Option value="mac001">Mac001</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            className="create_farm_form_item"
            name="contactpersonname"
            label="Contact Person Name"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Enter your Farm Name here" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className="create_farm_form_item"
            name="email"
            label="Email Id"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Enter your Farm Name here" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            className="create_farm_form_item"
            name="phoneno"
            label="Phone No"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Enter your Farm Name here" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className="create_farm_form_item"
            name="alternatephoneno"
            label="Alternate Phone No"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Enter your Farm Name here" />
          </Form.Item>
        </Col>
      </Row>
      <Row className="create_farm_action_button_area">
        <Col span={24} style={{ textAlign: "left" }}>
          <Button
            className="create_farm_form_item_buttons"
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
          <Button
            className="create_farm_form_item_buttons"
            style={{ margin: "0 8px" }}
            onClick={() => {
              setFormStepNo(1);
            }}
          >
            Previous
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

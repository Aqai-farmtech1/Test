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
import { useNavigate } from "react-router-dom";

const { Option } = Select;

export default function CreateFarmBasicInfo({
  setFormStepNo,
  formInputValues,
  setFormInputValues,
}) {
  const navigate = useNavigate();

  const handleFormSubmit = (values) => {
    const inputValues = { ...formInputValues, ...values };
    setFormInputValues(inputValues);
    console.log("s");
    setFormStepNo(2);
  };

  return (
    <Form
      style={{ width: "100%" }}
      layout="vertical"
      onFinish={handleFormSubmit}
    >
      <Form.Item
        className="create_farm_form_item"
        className="create_farm_form_item"
        label="Farm Type"
        name="farmtype"
        initialValue={"ownfarm"}
      >
        <Radio.Group size="large">
          <Radio value="ownfarm">Own Farm</Radio>
          <Radio value="partnerfarm">Partner Farm</Radio>
        </Radio.Group>
      </Form.Item>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            className="create_farm_form_item"
            name="farmname"
            label="Farm Name"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Enter your Farm Name here" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className="create_farm_form_item"
            name="farmcode"
            label="Farm Code"
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
            name="lattitude"
            label="Lattitude"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Lattitude Here" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className="create_farm_form_item"
            name="longitude"
            label="Longitude"
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
            name="producttype"
            label="Product Type"
            rules={[{ required: true }]}
            initialValue={["goat"]}
          >
            <Select disabled size="large" placeholder="Select Product">
              <Option value="goat">Goat</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className="create_farm_form_item"
            name="capacity"
            label="Capacity"
            rules={[{ required: true }]}
          >
            <InputNumber size="large" min={1} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            className="create_farm_form_item"
            name="choosemachines"
            label="Choose Machines"
            rules={[{ required: true }]}
            initialValue={["a10", "c12"]}
          >
            <Select mode="tags" size="large" placeholder="Please select">
              <Option value="mac001">Mac001</Option>
            </Select>
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
            Next
          </Button>
          <Button
            className="create_farm_form_item_buttons"
            style={{ margin: "0 8px" }}
            onClick={() => {
              navigate("/farm");
            }}
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

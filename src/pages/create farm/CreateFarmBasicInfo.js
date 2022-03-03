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
    console.log('Input values check', inputValues);
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
        label="Farm Type"
        name="farmtype"
        initialValue={"ownfarm"}
        rules={[{ required: true, message: "Farm Type is Required!" }]}
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
        </Col>
        <Col span={12}>
          <Form.Item
            className="create_farm_form_item"
            name="farmcode"
            label="Farm Code"
            rules={[
              { required: true, message: "Please enter your Farm Code" },
              {
                min: 3,
                message: "Farm code is too short!",
              },
              {
                max: 50,
                message: "Farm code is too long!",
              },
            ]}
          >
            <Input
              style={{ textTransform: "uppercase" }}
              size="large"
              placeholder="Enter your Farm Code here"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            className="create_farm_form_item"
            name="latitude"
            label="Latitude"
            rules={[
              { required: true, message: "Please enter Farm Latitude!" },
              {
                min: 1,
                message: "Latitude is too short!",
              },
            ]}
          >
            <Input
              type="number"
              size="large"
              placeholder="Enter Farm Lattitude Here"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className="create_farm_form_item"
            name="longitude"
            label="Longitude"
            rules={[
              { required: true, message: "Please enter Farm Longitude!" },
              {
                min: 1,
                message: "Longitude is too short!",
              },
            ]}
          >
            <Input
              type="number"
              size="large"
              placeholder="Enter Farm Longitude Here"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={12}>
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
        </Col>
        <Col span={12}>
          <Form.Item
            className="create_farm_form_item"
            name="capacity"
            label="Capacity"
            rules={[{ required: true, message: "Please enter Capacity!" }]}
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
            rules={[
              { required: true, message: "Please select atleast one machine!" },
            ]}
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

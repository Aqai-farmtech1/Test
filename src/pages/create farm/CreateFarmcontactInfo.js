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
  };

  return (
    <Form style={{ width: "100%" }} layout="vertical" onFinish={handleSubmit}>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            className="create_farm_form_item"
            name="address"
            label="Address"
            rules={[
              { required: true, message: "Please enter Farm Address!" },
              {
                min: 10,
                message: "Address should be minimum 10 characters length!",
              },
              {
                max: 256,
                message: "Address should be maximum 256 characters length!",
              },
            ]}
          >
            <Input size="large" placeholder="Enter your Farm Full Address" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className="create_farm_form_item"
            name="pincode"
            label="Pincode"
            rules={[
              { required: true, message: "Please enter Pincode!" },
              {
                min: 6,
                max: 6,
                message: "Invalid Pincode!",
              },
            ]}
          >
            <Input
              type="number"
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
            name="state"
            label="State"
            rules={[{ required: true, message: "Please select State!" }]}
          >
            <Select size="large" placeholder="Select State">
              <Option value="mac001">Mac001</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className="create_farm_form_item"
            name="city"
            label="City"
            rules={[{ required: true, message: "Please select City!" }]}
          >
            <Select size="large" placeholder="Select City">
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
            rules={[
              { required: true, message: "Please enter contact person Name!" },
              {
                min: 3,
                message: "Name is too short!",
              },
              {
                max: 50,
                message: "Name is too long!",
              },
            ]}
          >
            <Input
              type="number"
              size="large"
              placeholder="Enter Contact Person Name "
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className="create_farm_form_item"
            name="email"
            label="Email Id"
            rules={[
              { required: true, message: "Please enter your Email Id!" },
              {
                type: "email",
                message: "Invalid Email!",
              },
            ]}
          >
            <Input size="large" placeholder="Enter your Email Id" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            className="create_farm_form_item"
            name="phoneno"
            label="Phone No"
            rules={[
              { required: true, message: "Please enter your Phone No!" },
              {
                max: 10,
                min: 10,
                message: "Invalid Phone No!",
              },
            ]}
          >
            <Input size="large" placeholder="Enter your Mobile No " />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className="create_farm_form_item"
            name="alternatephoneno"
            label="Alternate Phone No"
            rules={[
              {
                max: 10,
                min: 10,
                message: "Invalid Phone No!",
              },
            ]}
          >
            <Input
              type="number"
              size="large"
              placeholder="Enter your Alternate Mobile No"
            />
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

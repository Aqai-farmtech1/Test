import React, { useEffect, useState } from "react";
import "./createfarm.css";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import PageTitle from "../../components/pagetitle/PageTitle";
import usePageInfo from "../../hooks/usePageInfo";
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

export default function CreateFarm() {
  const [formInputValues, setFormInputValues] = useState({});
  const { setPageTitle } = usePageInfo();
  const navigate = useNavigate();

  const handleFormSubmit = () => {};

  useEffect(() => {
    setPageTitle("Create Farm");
  }, []);

  return (
    <div className="create_farm">
      <BreadCrumb />
      <div className="page_title_create_farm"></div>
      <div className="create_farm_form_area">
        <div className="form_section_heading">Basic Info</div>
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
          <div className="form_section_heading">Contact Info</div>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                className="create_farm_form_item"
                name="phoneno"
                label="Contact No"
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
          <div className="form_section_heading">Address Info</div>
          <Row gutter={20}>
            <Col span={24}>
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
                <Input
                  size="large"
                  placeholder="Enter your Farm Full Address"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                className="create_farm_form_item"
                name="city"
                label="City"
                rules={[{ required: true, message: "Please enter City!" }]}
              >
                <Input type="text" placeholder="Enter your Farm city" />
              </Form.Item>
            </Col>
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
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                className="create_farm_form_item"
                name="country"
                label="Country"
                initialValue={"101"}
                rules={[{ required: true, message: "Please select State!" }]}
              >
                <Select disabled size="large" placeholder="Select State">
                  <Option value="101">India</Option>
                </Select>
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
      </div>
    </div>
  );
}

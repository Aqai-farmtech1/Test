import { Form, Row, Col, Button, Input, Select, Radio, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "../../api/customer.api";
import tryCatch from "../../helper/tryCatch.helper";
import useMasters from "../../hooks/useMasters";
import "./createsalesorder.css";

const { Option } = Select;

export default function CreateCustomer({
  setIsModalVisible,
  setCustomerDetail,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { stateMaster } = useMasters();
  const [form] = Form.useForm();

  const handleFormSubmit = async (values) => {
    message.loading({
      content: "Creating Customer...",
      key: "createCustomer",
      duration: 0,
    });
    const [customerResponse, customerError] = await tryCatch(
      createCustomer(values)
    );

    if (!customerError) {
      message.success({
        content: "Customer Created Succussfully!",
        key: "createCustomer",
      });
      const { full_name, id } = customerResponse.data;
      setCustomerDetail({ customer_name: full_name, customer: id });
      setIsModalVisible(false);
    } else {
      const errors = customerError.response.data.error;
      for (let err in errors) {
        const errorMessage = errors[err][0];
        message.error({ content: errorMessage, key: "createCustomer" });
      }
    }
  };

  return (
    <div className="create_customer">
      <h1>Customer Basic Info</h1>
      <Form
        form={form}
        style={{ width: "100%" }}
        layout="vertical"
        onFinish={handleFormSubmit}
      >
        <Form.Item
          className="create_farm_form_item create_customer_form"
          label="Customer Type"
          name="customer_type"
          initialValue={"1"}
          rules={[{ required: true, message: "Customer type is Required!" }]}
        >
          <Radio.Group size="large">
            <Radio value="1">Individual</Radio>
            <Radio value="2">Organisation</Radio>
          </Radio.Group>
        </Form.Item>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              className="create_farm_form_item"
              name="full_name"
              label="Customer Name"
              rules={[
                { required: true, message: "Please enter Customer Name" },
                {
                  min: 3,
                  message: "Customer Name is too short!",
                },
                {
                  max: 50,
                  message: "Customer Name is too long!",
                },
              ]}
            >
              <Input
                style={{ textTransform: "capitalize" }}
                size="large"
                placeholder="Enter Customer Name here"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="create_farm_form_item"
              name="organization_phone"
              label="Mobile Number"
              rules={[
                { required: true, message: "Please enter your Mobile Number!" },
                {
                  min: 10,
                  message: "Mobile number is too short!",
                },
                {
                  max: 13,
                  message: "Mobile number is too long!",
                },
              ]}
            >
              <Input
                className="farm_code_input"
                size="large"
                placeholder="Enter Customer Mobile Number here"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              className="create_farm_form_item"
              name="organization_email"
              label="Email"
              rules={[
                {
                  type: "email",
                  message: "Please enter valid email!",
                },
              ]}
            >
              <Input size="large" placeholder="Enter customer email id here" />
            </Form.Item>
          </Col>
        </Row>
        <div className="form_section_heading">Address Info</div>
        <Row gutter={20}>
          <Col span={24}>
            <Form.Item
              className="create_farm_form_item"
              name="organization_address"
              label="Address"
              rules={[
                { required: true, message: "Please enter Address!" },
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
              <Input size="large" placeholder="Enter Full Address" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              className="create_farm_form_item"
              name="organization_city"
              label="City"
              rules={[{ required: true, message: "Please enter City!" }]}
            >
              <Input size="large" type="text" placeholder="Enter  city" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="create_farm_form_item"
              name="organization_state"
              label="State"
              rules={[{ required: true, message: "Please select State!" }]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                className="dropdown_form"
                size="large"
                placeholder="Select State"
              >
                {stateMaster.map((el) => (
                  <Option key={el.id} value={el.id}>
                    {el.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              className="create_farm_form_item"
              name="organization_country"
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
              <Input type="number" size="large" placeholder="Enter Pincode" />
            </Form.Item>
          </Col>
        </Row>
        <Row className="create_farm_action_button_area">
          <Col span={24} style={{ textAlign: "left" }}>
            <Button
              loading={isLoading}
              className="create_farm_form_item_buttons"
              type="primary"
              htmlType="submit"
            >
              Save
            </Button>
            <Button
              className="create_farm_form_item_buttons"
              style={{ margin: "0 8px" }}
              onClick={() => setIsModalVisible(false)}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

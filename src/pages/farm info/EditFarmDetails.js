import React from "react";
import {
  Col,
  Form,
  Row,
  Input,
  Radio,
  Select,
  InputNumber,
  Button,
  Modal,
} from "antd";
import "./farminfo.css";

const { Option } = Select;

export default function EditFarmDetails({
  editModelVisible,
  setEditModalVisible,
}) {
  const handleUpdate = () => {};
  return (
    <Modal
      closable={false}
      centered
      visible={editModelVisible}
      onCancel={() => setEditModalVisible(false)}
      footer={[
        <Button type="primary" onClick={handleUpdate}>
          Update
        </Button>,
        <Button type="primary" ghost onClick={() => setEditModalVisible(false)}>
          Cancel
        </Button>,
      ]}
    >
      <div className="form_modal_container">
        <Form layout="vertical">
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
          <Row gutter={10}>
            <Col span={15}>
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
            <Col span={9}>
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
        </Form>
      </div>
    </Modal>
  );
}

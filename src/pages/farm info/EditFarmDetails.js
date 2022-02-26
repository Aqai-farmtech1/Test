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
          <Form.Item
            className="create_farm_form_item"
            name="farmname"
            label="Farm Name"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Enter your Farm Name here" />
          </Form.Item>
          <Form.Item
            className="create_farm_form_item"
            name="farmcode"
            label="Farm Code"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Enter your Farm Code here" />
          </Form.Item>
          <Form.Item
            className="create_farm_form_item"
            name="lattitude"
            label="Lattitude"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Lattitude Here" />
          </Form.Item>
          <Form.Item
            className="create_farm_form_item"
            name="longitude"
            label="Longitude"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Enter your Farm Code here" />
          </Form.Item>
          <Row gutter={10}>
            <Col span={15}>
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
            <Col span={9}>
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
          <Form.Item
            className="create_farm_form_item"
            name="address"
            label="Address"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Enter your Farm Name here" />
          </Form.Item>
          <Form.Item
            className="create_farm_form_item"
            name="pincode"
            label="Pincode"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Enter your Farm Code here" />
          </Form.Item>
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
          <Form.Item
            className="create_farm_form_item"
            name="contactpersonname"
            label="Contact Person Name"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Enter your Farm Name here" />
          </Form.Item>
          <Form.Item
            className="create_farm_form_item"
            name="email"
            label="Email Id"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Enter your Farm Name here" />
          </Form.Item>
          <Form.Item
            className="create_farm_form_item"
            name="phoneno"
            label="Phone No"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Enter your Farm Name here" />
          </Form.Item>
          <Form.Item
            className="create_farm_form_item"
            name="alternatephoneno"
            label="Alternate Phone No"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Enter your Farm Name here" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

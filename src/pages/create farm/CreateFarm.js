import React, { useEffect, useState } from "react";
import "./createfarm.css";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import usePageInfo from "../../hooks/usePageInfo";
import useMasters from "../../hooks/useMasters";
import {
  Col,
  Form,
  Row,
  Input,
  Radio,
  Select,
  InputNumber,
  Button,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import tryCatch from "../../helper/tryCatch.helper";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { createFarm } from "../../api/farm.api";
import { toSentenceCase } from "../../utils/toSentenceCase";
import {
  formNameInputRestriction,
  formPhoneInputRestriction,
  formPincodeInputRestriction,
} from "../../utils/formInputRestriction";

const { Option } = Select;

export default function CreateFarm() {
  const [form] = Form.useForm();
  const { productMaster, stateMaster } = useMasters();
  const { setPageTitle } = usePageInfo();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    const {
      address1,
      city,
      code,
      country,
      email,
      farm_type,
      latitude,
      longitude,
      name,
      phone_no,
      pincode,
      state,
      products,
    } = values;

    const allowed_product = productMaster
      .filter((el) => products.some((s) => s.product === el.code))
      .map((ell) => ell.id);

    const product_capacity = products.map((el) => ({
      product: el["product"],
      capacity: el["capacity"],
    }));

    const postData = {
      farm_type,
      name: toSentenceCase(name),
      code: code.toUpperCase(),
      latitude,
      longitude,
      allowed_product,
      product_capacity,
      phone_no,
      email,
      address1,
      city,
      state,
      country,
      pincode,
    };

    setIsLoading(true);
    message.loading({
      content: "Creating Farm...",
      key: "createfarm",
      duration: 0,
    });
    const [farmResponse, farmError] = await tryCatch(createFarm(postData));

    if (!farmError) {
      message.success({
        content: "Farm created successfully!",
        key: "createfarm",
      });
      setIsLoading(false);
      navigate("/farm");
    } else {
      setIsLoading(false);
      const errors = farmError.response.data.error;
      for (let err in errors) {
        const errorMessage = errors[err][0];
        message.error({ content: errorMessage, key: "createfarm" });
      }
    }
  };

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
          form={form}
          style={{ width: "100%" }}
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          <Form.Item
            className="create_farm_form_item"
            label="Farm Type"
            name="farm_type"
            initialValue={"1"}
            rules={[{ required: true, message: "Farm Type is Required!" }]}
          >
            <Radio.Group size="large">
              <Radio value="1">Own Farm</Radio>
              <Radio value="2">Partner Farm</Radio>
            </Radio.Group>
          </Form.Item>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                className="create_farm_form_item"
                name="name"
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
                  onKeyDown={(e) => formNameInputRestriction(e)}
                  style={{ textTransform: "capitalize" }}
                  size="large"
                  placeholder="Enter your Farm Name here"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className="create_farm_form_item"
                name="code"
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
                  onKeyDown={(e) => formNameInputRestriction(e)}
                  className="farm_code_input"
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
                  {
                    required: true,
                    message: "Please enter Farm Latitude!",
                  },
                  {
                    pattern: new RegExp(
                      /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/g
                    ),
                    message: "Invalid Latitude!",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter Farm Lattitude Here" />
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
                    pattern: new RegExp(
                      /^-?([1]?[1-7][1-9]|[1]?[1-8][0]|[1-9]?[0-9])\.{1}\d{1,6}$/
                    ),
                    message: "Invalid Longitude!",
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
          <Row>
            <Col span={24}>
              <Form.List
                initialValue={[
                  { name: 0, key: 0, isListField: true, fieldKey: 0 },
                ]}
                name="products"
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Row key={key} style={{ width: "100%" }} gutter={20}>
                        <Col span={12}>
                          <Form.Item
                            className="create_farm_form_item"
                            {...restField}
                            name={[name, "product"]}
                            label="Product Type"
                            rules={[
                              {
                                required: true,
                                message: "Please select Product!",
                              },
                            ]}
                          >
                            <Select
                              onChange={() =>
                                setSelectedProduct(
                                  form.getFieldValue("products")
                                )
                              }
                              size="large"
                              className="dropdown_form"
                              placeholder="Select Product"
                            >
                              {productMaster?.map((el) => (
                                <Option
                                  disabled={selectedProduct?.some(
                                    (val) =>
                                      Number(val.product) === Number(el.code)
                                  )}
                                  key={el.code}
                                  value={el.code}
                                >
                                  {el.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col
                          span={12}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Form.Item
                            className="create_farm_form_item"
                            {...restField}
                            name={[name, "capacity"]}
                            label="Capacity"
                            rules={[
                              {
                                required: true,
                                message: "Please enter Capacity!",
                              },
                            ]}
                          >
                            <Input type="number" size="large" min={1} />
                          </Form.Item>
                          {fields.length > 1 && (
                            <MinusCircleOutlined
                              style={{ marginLeft: "10px" }}
                              onClick={(va, i, j) => {
                                setSelectedProduct(
                                  form.getFieldValue("products")
                                );
                                remove(name);
                              }}
                            />
                          )}
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button
                        disabled={
                          productMaster.length === selectedProduct.length ||
                          !selectedProduct.length
                        }
                        type="primary"
                        onClick={() => {
                          setSelectedProduct(form.getFieldValue("products"));
                          add();
                        }}
                        icon={<PlusOutlined />}
                        ghost
                      >
                        Add Product
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
          </Row>
          <div className="form_section_heading">Contact Info</div>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                className="create_farm_form_item"
                name="phone_no"
                label="Contact No"
                rules={[
                  { required: true, message: "Please enter your Phone No!" },
                  {
                    max: 13,
                    min: 10,
                    message: "Invalid Phone No!",
                  },
                ]}
              >
                <Input
                  addonBefore="+91"
                  onKeyDown={(e) => formPhoneInputRestriction(e)}
                  type={"number"}
                  size="large"
                  placeholder="Enter your Mobile No "
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
                    message: "Ivalid Email!",
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
                name="address1"
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
                <Input
                  size="large"
                  type="text"
                  placeholder="Enter your Farm city"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className="create_farm_form_item"
                name="state"
                label="State"
                rules={[{ required: true, message: "Please select State!" }]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
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
                  onKeyDown={(e) => formPincodeInputRestriction(e)}
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

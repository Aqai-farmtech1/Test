import React, { useEffect, useState } from "react";
import "./editfarm.css";
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
  Switch,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import tryCatch from "../../helper/tryCatch.helper";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { getFarm, updateFarmStatus, updateFarm } from "../../api/farm.api";

const { Option } = Select;

export default function EditFarm() {
  const [form] = Form.useForm();
  const [isActive, setIsActive] = useState(true);
  const { productMaster, stateMaster } = useMasters();
  const { setPageTitle } = usePageInfo();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [farmDetails, setFarmDetails] = useState({});
  const navigate = useNavigate();
  const { farmid } = useParams();

  const handleToggleChange = async (value) => {
    message.loading({
      content: "Updating Farm Status...",
      key: "updateFarmStatus",
      duration: 0,
    });
    const [farmUpdateResponse, farmUpdateError] = await tryCatch(
      updateFarmStatus(farmid)
    );

    if (!farmUpdateError) {
      message.success({
        content: "Updated Successfully!",
        duration: "0.3",
        key: "updateFarmStatus",
      });
      setIsActive(value);
    } else {
      // console.log(farmUpdateResponse)
      const errors = farmUpdateError.response.data.error;
      for (let err in errors) {
        const errorMessage = errors[err][0];
        message.error({ content: errorMessage, key: "updateFarmStatus" });
      }
    }
  };

  const handleFormSubmit = async (values) => {
    const allowed_product = values.products?.map(
      (el) => productMaster.find((f) => f.code === el.product)?.id
    );

    const product_capacity = values.products.map((el) => {
      const productId = farmDetails.product_capacity.find(
        (f) => f.product === el.product
      )?.id;
      return productId ? { ...el, id: productId } : { ...el };
    });
    const alteredData = {
      ...values,
      allowed_product,
      product_capacity,
    };

    const {
      farm_type,
      name,
      code,
      pincode,
      latitude,
      longitude,
      country,
      state,
      city,
      phone_no,
      email,
    } = alteredData;

    const postData = {
      farm_type,
      allowed_product: alteredData.allowed_product,
      name,
      code,
      address1: alteredData.primary_address,
      pincode,
      latitude,
      longitude,
      country,
      state,
      city,
      phone_no,
      email,
      product_capacity: alteredData.product_capacity,
    };

    setIsLoading(true);
    message.loading({
      content: "Updating Farm Details...",
      key: "editfarm",
      duration: 0,
    });
    const [farmResponse, farmError] = await tryCatch(
      updateFarm(farmid, postData)
    );

    if (!farmError) {
      message.success({
        content: "Details Updated successfully!",
        key: "editfarm",
      });
      setIsLoading(false);
      navigate("/farm");
    } else {
      setIsLoading(false);
      const errors = farmError.response.data.error;
      for (let err in errors) {
        const errorMessage = errors[err][0];
        message.error({ content: errorMessage, key: "editfarm" });
      }
    }
  };

  const getFarmDetails = async () => {
    message.loading({
      content: "Fetching Farm Details!",
      key: "farmFetch",
      duration: 0,
    });
    const [farmResponse, farmError] = await tryCatch(getFarm(farmid));

    if (!farmError) {
      message.success({
        content: "Fetched Successfully!",
        duration: "0.3",
        key: "farmFetch",
      });
      const {
        primary_address,
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
        product_capacity,
      } = farmResponse.data;

      const products = product_capacity?.map((el) => ({
        id: el.id,
        product: el.product,
        capacity: el.capacity,
      }));

      form.setFieldsValue({
        primary_address,
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
      });
      setFarmDetails(farmResponse.data);
      setSelectedProduct(products);
    } else {
      const errors = farmResponse.response.data.error;
      for (let err in errors) {
        const errorMessage = errors[err][0];
        message.error({ content: errorMessage, key: "getUser" });
      }
      console.log(farmError.response);
    }
  };

  useEffect(() => {
    setPageTitle("Edit Farm");
    getFarmDetails();
  }, []);

  return (
    <div className="create_farm">
      <BreadCrumb />
      <div className="page_title_create_farm"></div>
      <div className="create_farm_form_area">
        <div className="form_section_heading">
          <div className="form_section_heading_title">Basic Info</div>
          <Switch
            checked={isActive}
            checkedChildren="Active"
            unCheckedChildren="InActive"
            className="edit_user_toggle_button"
            onChange={handleToggleChange}
          />
        </div>
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
            rules={[{ required: true, message: "Farm Type is Required!" }]}
          >
            <Radio.Group size="large">
              <Radio value={1}>Own Farm</Radio>
              <Radio value={2}>Partner Farm</Radio>
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
              <Form.List name="products">
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
                              {productMaster.map((el) => (
                                <Option
                                  disabled={selectedProduct?.some(
                                    (val) =>
                                      Number(val?.product) === Number(el?.code)
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
                            <InputNumber size="large" min={1} />
                          </Form.Item>
                          {fields.length > 1 && (
                            <MinusCircleOutlined
                              style={{ marginLeft: "10px" }}
                              onClick={() => {
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
                        type="primary"
                        onClick={() => {
                          setSelectedProduct(form.getFieldValue("products"));
                          console.log(form.getFieldsValue("products"));
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
                name="primary_address"
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
                rules={[{ required: true, message: "Please select State!" }]}
              >
                <Select disabled size="large" placeholder="Select State">
                  <Option value={101}>India</Option>
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
                loading={isLoading}
                className="create_farm_form_item_buttons"
                type="primary"
                htmlType="submit"
              >
                Update
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

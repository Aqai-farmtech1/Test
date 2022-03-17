import React, { createRef, useEffect, useState } from "react";
import "./createpurchaseorder.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Form,
  Radio,
  Row,
  Col,
  Input,
  Button,
  Select,
  DatePicker,
  Empty,
  ConfigProvider,
  Modal,
  message,
} from "antd";
import tryCatch from "../../helper/tryCatch.helper";
import { searchVendor } from "../../api/vendor.api";
import usePageInfo from "../../hooks/usePageInfo";
import useMasters from "../../hooks/useMasters";
import { createPurchase } from "../../api/purchase.api";
import CreateVendor from "./CreateVendor";
const { Option } = Select;

export default function CreatePurchaseOrder() {
  const [isCustomerLoading, setIsCustomerLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchPhoneLength, setSearchPhoneLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [vendorList, setVendorList] = useState([]);
  const { setPageTitle } = usePageInfo();
  const { farmMaster, productMaster } = useMasters();
  const [form] = Form.useForm();
  const mobileRef = createRef();
  const navigate = useNavigate();

  const handleFormSubmit = async (value) => {
    const postData = {
      farm: value.farm,
      vendor: value.vendor,
      purchase_order_product: {
        product: value.product,
        quantity: value.quantity,
        price_per_kg: value.price_per_kg,
      },
      purchase_date: value.purchase_date.format("YYYY-MM-DD"),
    };

    message.loading({
      content: "Creating Purchase Order...",
      key: "createPurchase",
      duration: 0,
    });
    setIsLoading(true);
    const [purchaseResponse, purchaseError] = await tryCatch(
      createPurchase(postData)
    );

    if (!purchaseError) {
      setIsLoading(false);
      message.success({
        content: "Purchase Order Created Successfully!",
        key: "createPurchase",
      });
      navigate("/transactions", {
        state: {
          activeTab: "2",
          activeName: "Purchase",
          activeLink: "purchase",
        },
      });
    } else {
      setIsLoading(false);
      const errors = purchaseError.response.data.error;
      for (let err in errors) {
        const errorMessage = errors[err][0];
        message.error({ content: errorMessage, key: "createPurchase" });
      }
    }
  };

  const handleSearch = async (value) => {
    getCustomerList(value);
  };

  const handleCustomerChange = (value) => {
    const vendorName = vendorList.find((f) => Number(f.id) === Number(value));
    form.setFieldsValue({
      vendor_name: vendorName.full_name,
    });
  };

  const setVendorDetail = async (value) => {
    const [vendorResponse, vendorError] = await tryCatch(searchVendor(0));

    if (!vendorError) {
      setSearchPhoneLength(0);
      setIsCustomerLoading(false);
      setVendorList(vendorResponse.data);
      form.setFieldsValue(value);
    } else {
      setIsCustomerLoading(false);
      setSearchPhoneLength(0);
      console.log(vendorError.response);
    }
  };

  const getCustomerList = async (phone = 0) => {
    setIsCustomerLoading(true);
    const [customerResponse, customerError] = await tryCatch(
      searchVendor(phone)
    );

    if (!customerError) {
      setSearchPhoneLength(phone.length || 0);
      setIsCustomerLoading(false);
      setVendorList(customerResponse.data);
    } else {
      setIsCustomerLoading(false);
      setSearchPhoneLength(phone.length || 0);
      console.log(customerError.response);
    }
  };

  const selectEmptyRender = () => (
    <div className="create_new_vendor">
      <h1>No Data Found</h1>
      <Button
        onClick={() => {
          mobileRef.current.blur();
          setIsModalVisible(true);
        }}
        className="create_new_vendor_button"
        type="primary"
      >
        Create Vendor
      </Button>
    </div>
  );

  useEffect(() => {
    getCustomerList();
    setPageTitle("Create Purchase Order");
  }, []);

  return (
    <div className="order_create_main">
      <h1>Purchase Order</h1>
      <Form
        form={form}
        style={{ width: "100%" }}
        layout="vertical"
        onFinish={handleFormSubmit}
      >
        <Row gutter={20}>
          <Col span={12}>
            <ConfigProvider renderEmpty={selectEmptyRender}>
              <Form.Item
                className="create_farm_form_item"
                name="vendor"
                label="Mobile No"
                rules={[
                  {
                    required: true,
                    message: "Please enter customer Mobile No.",
                  },
                ]}
              >
                <Select
                  loading={isCustomerLoading}
                  ref={mobileRef}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  size="large"
                  onChange={handleCustomerChange}
                  className="dropdown_form"
                  showSearch
                  placeholder="Enter Customer Mobile No. here"
                  onSearch={handleSearch}
                >
                  {vendorList.map((el) => (
                    <Option key={el.id} value={el.id}>
                      <span className="highlight_match">
                        {el.phone_num.slice(0, searchPhoneLength)}
                      </span>
                      {el.phone_num.slice(searchPhoneLength)} - {el.full_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </ConfigProvider>
          </Col>
          <Col span={12}>
            <Form.Item
              className="create_farm_form_item"
              name="vendor_name"
              label="Vendor Name"
            >
              <Input size="large" placeholder="Enter Customer Name here" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              className="create_farm_form_item"
              name="farm"
              label="Farm"
              rules={[{ required: true, message: "Please select Farm." }]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                size="large"
                placeholder="Select a Farm"
              >
                {farmMaster?.map((el) => (
                  <Option key={el.id} value={el.id}>
                    {el.farm_name} - {el.code}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              className="create_farm_form_item"
              name="purchase_date"
              label="Purchase Date"
              rules={[{ required: true, message: "Please select sales date." }]}
            >
              <DatePicker size="large" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              className="create_farm_form_item"
              name="product"
              label="Product"
              rules={[{ required: true, message: "Please select Product!" }]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                size="large"
                placeholder="Select a Product"
              >
                {productMaster?.map((el) => (
                  <Option key={el.code} value={el.code}>
                    {el.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              className="create_farm_form_item"
              name="quantity"
              label="Quantity"
              rules={[
                { required: true, message: "Please enter product quantity!" },
              ]}
            >
              <Input
                className="farm_code_input"
                size="large"
                placeholder="Enter your Farm Code here"
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              className="create_farm_form_item"
              name="price_per_kg"
              label="Price Per Kg"
              rules={[{ required: true, message: "Please enter price per kg" }]}
            >
              <Input
                prefix="₹"
                className="farm_code_input"
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
              style={{ padding: "9px 38px", height: "auto" }}
              className="create_farm_form_item_buttons"
              type="primary"
              htmlType="submit"
            >
              Create
            </Button>
            <Button
              style={{
                paddingTop: "9px",
                paddingBottom: "9px",
                height: "auto",
                margin: "0 12px",
              }}
              className="create_farm_form_item_buttons"
              onClick={() => {
                navigate("/transactions");
              }}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
      <Modal
        title={null}
        onCancel={() => setIsModalVisible(false)}
        visible={isModalVisible}
        footer={null}
      >
        <CreateVendor
          setVendorDetail={setVendorDetail}
          setIsModalVisible={setIsModalVisible}
        />
      </Modal>
    </div>
  );
}

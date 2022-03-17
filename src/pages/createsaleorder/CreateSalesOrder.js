import React, { createRef, useEffect, useState } from "react";
import "./createsalesorder.css";
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
import CreateCustomer from "./CreateCustomer";
import tryCatch from "../../helper/tryCatch.helper";
import { searchCustomer } from "../../api/customer.api";
import usePageInfo from "../../hooks/usePageInfo";
import useMasters from "../../hooks/useMasters";
import { createSalesOrder } from "../../api/sales.api";
const { Option } = Select;

export default function CreateSalesOrder() {
  const [isCustomerLoading, setIsCustomerLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchPhoneLength, setSearchPhoneLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const { setPageTitle } = usePageInfo();
  const { farmMaster, productMaster } = useMasters();
  const [form] = Form.useForm();
  const mobileRef = createRef();
  const navigate = useNavigate();

  const handleFormSubmit = async (value) => {
    const postData = {
      farm: value.farm,
      customer: value.customer,
      sales_order_product: {
        product: value.product,
        quantity: value.quantity,
        price_per_kg: value.price_per_kg,
      },
      sales_date: value.sales_date.format("YYYY-MM-DD"),
    };

    message.loading({
      content: "Creating Sales Order...",
      key: "createSales",
      duration: 0,
    });
    setIsLoading(true);
    const [salesResponse, salesError] = await tryCatch(
      createSalesOrder(postData)
    );

    if (!salesError) {
      setIsLoading(false);
      message.success({
        content: "Sales Order Created Successfully!",
        key: "createSales",
      });
      navigate("/transactions", {
        state: {
          activeTab: "1",
          activeName: "Sales",
          activeLink: "sales",
        },
      });
    } else {
      setIsLoading(false);
      const errors = salesError.response.data.error;
      for (let err in errors) {
        const errorMessage = errors[err][0];
        message.error({ content: errorMessage, key: "createSales" });
      }
    }
  };

  const handleSearch = async (value) => {
    getCustomerList(value);
  };

  const handleCustomerChange = (value) => {
    const customerName = customerList.find(
      (f) => Number(f.id) === Number(value)
    );
    form.setFieldsValue({
      customer_name: customerName.full_name,
    });
  };

  const setCustomerDetail = async (value) => {
    const [customerResponse, customerError] = await tryCatch(searchCustomer(0));

    if (!customerError) {
      setSearchPhoneLength(0);
      setIsCustomerLoading(false);
      setCustomerList(customerResponse.data);
      form.setFieldsValue(value);
    } else {
      setIsCustomerLoading(false);
      setSearchPhoneLength(0);
      console.log(customerError.response);
    }
  };

  const getCustomerList = async (phone = 0) => {
    setIsCustomerLoading(true);
    const [customerResponse, customerError] = await tryCatch(
      searchCustomer(phone)
    );

    if (!customerError) {
      setSearchPhoneLength(phone.length || 0);
      setIsCustomerLoading(false);
      setCustomerList(customerResponse.data);
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
        Create Customer
      </Button>
    </div>
  );

  useEffect(() => {
    getCustomerList();
    setPageTitle("Create Sales Order");
  }, []);

  return (
    <div className="order_create_main">
      <h1>Sales Order</h1>
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
                name="customer"
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
                  {customerList.map((el) => (
                    <Option key={el.id} value={el.id}>
                      <span className="highlight_match">
                        {el.phone_num?.slice(0, searchPhoneLength)}
                      </span>
                      {el.phone_num?.slice(searchPhoneLength)} - {el.full_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </ConfigProvider>
          </Col>
          <Col span={12}>
            <Form.Item
              className="create_farm_form_item"
              name="customer_name"
              label="Customer Name"
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
              name="sales_date"
              label="Sales Date"
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
        <CreateCustomer
          setCustomerDetail={setCustomerDetail}
          setIsModalVisible={setIsModalVisible}
        />
      </Modal>
    </div>
  );
}

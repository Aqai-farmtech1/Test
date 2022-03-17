import React, { useEffect, useReducer, useState } from "react";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import { Row, Col, Button, Form, Select, Input, Switch, message } from "antd";
import "./profileupdate.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import usePageInfo from "../../hooks/usePageInfo";
import useMasters from "../../hooks/useMasters";
import tryCatch from "../../helper/tryCatch.helper";
import { getUserProfile, updateProfile } from "../../api/user.api";

const { Option } = Select;

export default function ProfileUpdate() {
  const [userData, setUserData] = useState({});
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormDataChanged, setIsFormDataChanged] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(0);
  const { setPageTitle, setBreadCrumbPath } = usePageInfo();
  const {
    designationMaster,
    stateMaster,
    farmMaster,
    productMaster,
    fetchFarm,
  } = useMasters();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { userid } = useParams();

  const handleSubmit = async () => {
    const formData = form.getFieldsValue();
    console.log(formData);
    // console.log("Send", {
    //   ...formData,
    //   permission: [],
    //   farm: formData.farm ? [formData.farm] : [],
    //   employee_id: formData.employee_id.toUpperCase(),
    // });
    // const [userUpdateResponse, userUpdateError] = await tryCatch(
    //   updateProfile(userData.id, {
    //     ...formData,
    //     permission: [],
    //     farm: formData.farm ? [formData.farm] : [],
    //   })
    // );

    // message.loading({
    //   content: "Updating User Status",
    //   key: "userUpdateStatus",
    //   duration: 0,
    // });
    // if (!userUpdateError) {
    //   message.success({
    //     content: "User Status updated successfully!",
    //     key: "userUpdateStatus",
    //   });
    //   navigate("/profile");
    // } else {
    //   const errors = userUpdateError.response.data.error;
    //   for (let err in errors) {
    //     const errorMessage = errors[err][0];
    //     message.error({ content: errorMessage, key: "userUpdateStatus" });
    //   }
    // }
  };

  const handleFormChange = () => {
    setIsFormDataChanged(true);
  };

  const getUserDetails = async () => {
    setIsLoading(true);
    message.loading({
      content: "Fetching User Details",
      key: "getUser",
      duration: 0,
    });
    const [userResponse, userError] = await tryCatch(getUserProfile(userid));
    if (!userError) {
      setIsLoading(false);
      message.success({
        content: "User Fetched Successfully!  ",
        key: "getUser",
        duration: "0.3",
      });
      const {
        id,
        fullname,
        employee_id,
        email,
        phone1,
        phone2,
        designation,
        product,
        farm,
        address1,
        state,
        city,
        country,
        pincode,
      } = userResponse.data;

      const userDetails = {
        id,
        fullname,
        employee_id,
        email,
        phone1,
        phone2,
        designation,
        product: product || [],
        farm: farm && farm[0],
        address1,
        state,
        city,
        country,
        pincode,
      };
      setBreadCrumbPath(`/user/${fullname || ""}`);
      form.setFieldsValue(userDetails);
      setIsActive(userResponse.data.is_active);
      setSelectedUserType(designation);
      setUserData(userDetails);
    } else {
      setBreadCrumbPath(`/user/${""}`);
      const errors = userResponse.response.data.error;
      for (let err in errors) {
        const errorMessage = errors[err][0];
        message.error({ content: errorMessage, key: "getUser" });
      }
      console.log(userError.response);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPageTitle("Edit User");
    fetchFarm();
    getUserDetails();
    setBreadCrumbPath(`/user/${userData.fullname || ""}`);
  }, []);

  return (
    <div className="edit_user_main">
      <BreadCrumb />
      <div className="edit_user_form_area">
        <div className="edit_user_active_container">
          <div className="form_section_header">Basic Info</div>
        </div>
        <Form
          onChange={handleFormChange}
          form={form}
          style={{ width: "100%" }}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                className="create_farm_form_item"
                name="fullname"
                label="Emp Name"
                rules={[
                  { required: true, message: "Please Enter Name!" },
                  {
                    min: 3,
                    message: "Name should be minimum 3 characters length!",
                  },
                  {
                    max: 30,
                    message: "Name should be maximum 30 characters length!",
                  },
                ]}
              >
                <Input
                  type="text"
                  style={{ textTransform: "capitalize" }}
                  size="large"
                  placeholder="Enter your Full Name here"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className="create_farm_form_item"
                name="employee_id"
                label="Emp Code"
                rules={[
                  { required: true, message: "Please Emp Code!" },
                  {
                    min: 1,
                    message: "Code should be minimum 1 characters length!",
                  },
                  {
                    max: 30,
                    message: "Code should be maximum 30 characters length!",
                  },
                ]}
              >
                <Input
                  type="text"
                  style={{ textTransform: "uppercase" }}
                  size="large"
                  placeholder="Enter your Emp Code here"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
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
                <Input
                  disabled
                  size="large"
                  placeholder="Enter your Email Id"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className="create_farm_form_item"
                name="phone1"
                label="Phone No"
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
                  type="number"
                  size="large"
                  placeholder="Enter your Mobile No"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                className="create_farm_form_item"
                name="phone2"
                label="Alternate Phone No"
                rules={[
                  {
                    max: 13,
                    min: 10,
                    message: "Invalid Phone No!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter your Alternate Mobile No"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className="create_farm_form_item"
                name="designation"
                label="User Type"
                rules={[
                  { required: true, message: "Please select User Type!" },
                ]}
              >
                <Select
                  disabled
                  onChange={(value) => {
                    setSelectedUserType(value);
                    setIsFormDataChanged(true);
                  }}
                  size="large"
                  placeholder="Select User Type"
                >
                  {designationMaster
                    ?.filter((f) => f.code !== 5 && f.code !== 6)
                    ?.map((el) => (
                      <Option key={el.code} value={el.code}>
                        {el.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {selectedUserType === 4 && (
            <Row gutter={20}>
              <Col span={24}>
                <Form.Item
                  className="create_farm_form_item"
                  name="product"
                  label="Products"
                  rules={[
                    { required: true, message: "please Select Product!" },
                  ]}
                >
                  <Select
                    mode="tags"
                    onChange={() => setIsFormDataChanged(true)}
                    size="large"
                    placeholder="Please select"
                  >
                    {productMaster?.map((el) => (
                      <Option value={el.code} key={el.code}>
                        {el.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          )}
          {selectedUserType === 3 && (
            <Row gutter={20}>
              <Col span={24}>
                <Form.Item
                  className="create_farm_form_item"
                  name="farm"
                  label="Farms"
                  rules={[{ required: true, message: "Please select a Farm!" }]}
                >
                  <Select
                    onChange={() => setIsFormDataChanged(true)}
                    size="large"
                    placeholder="Select Farm"
                  >
                    {farmMaster?.map((el) => (
                      <Option key={el.id} value={el.id}>
                        {el.farm_name} - {el.code}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          )}
          <div className="form_section_header">Address Info</div>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                className="create_farm_form_item"
                name="address1"
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
                <Input size="large" placeholder="Enter Farm Address" />
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
                <Select
                  onChange={() => setIsFormDataChanged(true)}
                  size="large"
                  placeholder="Select State"
                >
                  {stateMaster?.map((el) => (
                    <Option key={el.id} value={el.id}>
                      {el.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className="create_farm_form_item"
                name="city"
                label="City"
                rules={[
                  { required: true, message: "Please Enter City!" },
                  {
                    min: 3,
                    message: "City Name should be minimum 3 characters!",
                  },
                ]}
              >
                <Input placeholder="Enter City" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                className="create_farm_form_item"
                name="country"
                label="Country"
                rules={[{ required: true, message: "Please select Country!" }]}
              >
                <Select
                  onChange={() => setIsFormDataChanged(true)}
                  disabled
                  size="large"
                  placeholder="Select State"
                >
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
                <Input size="large" placeholder="Enter Farm Pincode" />
              </Form.Item>
            </Col>
          </Row>
          <Row className="create_farm_action_button_area">
            <Col span={24} style={{ textAlign: "left" }}>
              <Button
                loading={isLoading}
                disabled={!isFormDataChanged}
                // disabled
                className="create_farm_form_item_buttons edit_user_update_button"
                type="primary"
                htmlType="submit"
              >
                Update
              </Button>
              <NavLink to="/user">
                <Button className="create_farm_form_item_buttons">
                  Cancel
                </Button>
              </NavLink>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

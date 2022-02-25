import React, { useState } from "react";
import { Button, Dropdown, Menu, Input, Table, Badge } from "antd";
import { DownOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import "./farmlist.css";
import { NavLink } from "react-router-dom";
import PageTitle from "../../components/pagetitle/PageTitle";

const { Search } = Input;

export default function FarmList() {
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");

  const handleMenuClick = () => {};

  const handleSearch = () => {};

  const handleTableChange = () => {};

  const columns = [
    {
      title: "Farm Code",
      dataIndex: "farmcode",
      render: (value, columns) => (
        <NavLink
          to={{
            pathname: `/farm/${columns.farmname}`,
          }}
          state={{ farmcode: value }}
        >
          <div
            style={{
              color: "#2D9CDB",
              fontStyle: "normal",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "22px",
            }}
          >
            {value}
          </div>
        </NavLink>
      ),
    },
    {
      title: "Farm Name",
      dataIndex: "farmname",
      width: "20%",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Ready to Sale",
      dataIndex: "readytosale",
    },
    {
      title: "Free Capacity",
      dataIndex: "freecapacity",
    },
    {
      title: "Sick",
      dataIndex: "sick",
    },
    {
      title: "Mortality",
      dataIndex: "mortality",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <div className="status_text">
          <div
            style={
              value === "Active"
                ? { backgroundColor: "#52C41A" }
                : { backgroundColor: "#FF4D4F" }
            }
            className="dot_badge"
          ></div>
          {value}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "8%",
      render: (value, columns) => (
        <NavLink
          to={{
            pathname: `/farm/${columns.farmname}`,
          }}
          state={{ farmcode: columns.farmcode }}
        >
          <Button style={{ borderRadius: "4px" }} type="primary" ghost>
            View
          </Button>
        </NavLink>
      ),
    },
  ];

  const data = [
    {
      key: 1,
      farmcode: "FRM-123456",
      farmname: "Red Hills Farm",
      location: "Chennai-TN",
      readytosale: 1000,
      freecapacity: 500,
      sick: 50,
      mortality: 10,
      status: "Active",
      action: "View",
    },
    {
      key: 2,
      farmcode: "FRM-111111",
      farmname: "Red Hills Farm",
      location: "Chennai-TN",
      readytosale: 1000,
      freecapacity: 500,
      sick: 50,
      mortality: 10,
      status: "In Active",
      action: "View",
    },
    {
      key: 3,
      farmcode: "FRM-222222",
      farmname: "Red Hills Farm",
      location: "Chennai-TN",
      readytosale: 1000,
      freecapacity: 500,
      sick: 50,
      mortality: 10,
      status: "In Active",
      action: "View",
    },
    {
      key: 4,
      farmcode: "FRM-333333",
      farmname: "Red Hills Farm",
      location: "Chennai-TN",
      readytosale: 1000,
      freecapacity: 500,
      sick: 50,
      mortality: 10,
      status: "Active",
      action: "View",
    },
    {
      key: 5,
      farmcode: "FRM-444444",
      farmname: "Red Hills Farm",
      location: "Chennai-TN",
      readytosale: 1000,
      freecapacity: 500,
      sick: 50,
      mortality: 10,
      status: "Active",
      action: "View",
    },
    {
      key: 6,
      farmcode: "FRM-555555",
      farmname: "Red Hills Farm",
      location: "Chennai-TN",
      readytosale: 1000,
      freecapacity: 500,
      sick: 50,
      mortality: 10,
      status: "Active",
      action: "View",
    },
    {
      key: 7,
      farmcode: "FRM-666666",
      farmname: "Red Hills Farm",
      location: "Chennai-TN",
      readytosale: 1000,
      freecapacity: 500,
      sick: 50,
      mortality: 10,
      status: "Active",
      action: "View",
    },
  ];

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="farmlist">
      <PageTitle title={"Farms"} />
      <div className="farmlist_action_area">
        <div className="action_filter_area">
          <div className="action_filter_state">
            <Dropdown trigger={["click"]} overlay={menu}>
              <Button style={{ borderRadius: "4px" }} size="large">
                <span className="filter_button_text">
                  State : {selectedState}
                </span>
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
          <div className="action_filter_city">
            <Dropdown trigger={["click"]} overlay={menu}>
              <Button size="large" style={{ borderRadius: "4px" }}>
                <span className="filter_button_text">
                  City : {selectedCity}
                </span>
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>
        <div className="farmlist_search_area">
          <div className="farmlist_search">
            <Search
              placeholder="Search by Code, Farm Name"
              allowClear
              onSearch={handleSearch}
              size="large"
              style={{ borderRadius: "4px", width: 264 }}
            />
          </div>
          <div className="farmlist_create_new">
            <NavLink to="/farm/create">
              <Button
                style={{ borderRadius: "4px" }}
                type="primary"
                icon={<PlusOutlined />}
                size="large"
              >
                <span className="button_text">Create New</span>
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="farmlist_table">
        <Table
          style={{ width: "100%" }}
          columns={columns}
          dataSource={data}
          onChange={handleTableChange}
          bordered
        />
      </div>
    </div>
  );
}

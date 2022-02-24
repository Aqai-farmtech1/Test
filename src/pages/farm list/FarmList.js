import React, { useState } from "react";
import { Button, Dropdown, Menu, Input, Table, Badge } from "antd";
import { DownOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import "./farmlist.css";

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
      render: (value) => <div style={{ color: "blue" }}>{value}</div>,
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
      ellipsis: true,
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
      width: "6%",
      render: () => (
        <Button block type="primary" ghost>
          View
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: 1,
      farmcode: "FRM-21515",
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
      farmcode: "FRM-21515",
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
      farmcode: "FRM-21515",
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
      farmcode: "FRM-21515",
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
      farmcode: "FRM-21515",
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
      farmcode: "FRM-21515",
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
      farmcode: "FRM-21515",
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
      <div className="farmlist_title">Farms</div>
      <div className="farmlist_action_area">
        <div className="action_filter_area">
          <div className="action_filter_state">
            <Dropdown trigger={["click"]} overlay={menu}>
              <Button size="large">
                <span className="filter_button_text">
                  State : {selectedState}
                </span>
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
          <div className="action_filter_city">
            <Dropdown trigger={["click"]} overlay={menu}>
              <Button size="large">
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
              style={{ width: 264 }}
              size="large"
            />
          </div>
          <div className="farmlist_create_new">
            <Button type="primary" icon={<PlusOutlined />} size="large">
              <span className="button_text">Create New</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="farmlist_table">
        <Table
          columns={columns}
          dataSource={data}
          onChange={handleTableChange}
          bordered
        />
      </div>
    </div>
  );
}

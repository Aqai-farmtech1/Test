import React, { useEffect, useState } from "react";
import { Button, Dropdown, Menu, Input, Table, Badge } from "antd";
import { DownOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import "./farmlist.css";
import { NavLink } from "react-router-dom";
import PageTitle from "../../components/pagetitle/PageTitle";
import { editIcon, viewIcon } from "../../utils/constants";
import usePageInfo from "../../hooks/usePageInfo";

const { Search } = Input;

export default function FarmList() {
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const { setPageTitle } = usePageInfo();

  useEffect(() => {
    setPageTitle("Farm");
  }, [setPageTitle]);

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
            pathname: `/farm/${value}`,
          }}
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
      title: "State",
      dataIndex: "state",
    },
    {
      title: "Product & Capacity",
      dataIndex: "productcapacity",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "8%",
      render: (value, columns) => (
        <div className="action_button_div">
          <NavLink to={`/farm/create`}>
            <Button
              className="user_list_buttons"
              style={{ borderRadius: "4px" }}
              block
              type="primary"
              ghost
            >
              <img className="button_icon" src={editIcon} alt="edit icon" />
              Edit
            </Button>
          </NavLink>
          <NavLink to={`/farm/${columns.farmcode}`}>
            <Button
              className="user_list_buttons"
              style={{ borderRadius: "4px", marginLeft: 6 }}
              block
              type="primary"
              ghost
            >
              <img className="button_icon" src={viewIcon} alt="view icon" />
              View
            </Button>
          </NavLink>
        </div>
      ),
    },
  ];

  const data = [
    {
      key: 1,
      farmcode: "FRM-123456",
      farmname: "Red Hills Farm",
      state: "Tamilnadu",
      productcapacity: "d",
      action: "View",
    },
    {
      key: 2,
      farmcode: "FRM-111111",
      farmname: "Red Hills Farm",
      state: "Tamilnadu",
      productcapacity: "d",
      action: "View",
    },
    {
      key: 3,
      farmcode: "FRM-222222",
      farmname: "Red Hills Farm",
      state: "Tamilnadu",
      productcapacity: "d",
      action: "View",
    },
    {
      key: 4,
      farmcode: "FRM-333333",
      farmname: "Red Hills Farm",
      state: "Tamilnadu",
      productcapacity: "d",
      action: "View",
    },
    {
      key: 5,
      farmcode: "FRM-444444",
      farmname: "Red Hills Farm",
      state: "Tamilnadu",
      productcapacity: "d",
      action: "View",
    },
    {
      key: 6,
      farmcode: "FRM-555555",
      farmname: "Red Hills Farm",
      state: "Tamilnadu",
      productcapacity: "d",
      action: "View",
    },
    {
      key: 7,
      farmcode: "FRM-666666",
      farmname: "Red Hills Farm",
      state: "Tamilnadu",
      productcapacity: "d",
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
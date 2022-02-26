import React from "react";
import { Row, Col, Menu, Dropdown, Button, Input, Table } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import "./farminfo.css";

const { Search } = Input;

export default function FarmInfoContent() {
  const columns = [
    {
      title: "RFID",
      dataIndex: "rfid",
      render: (value, columns) => (
        <NavLink
          to={{
            pathname: `${value}`,
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
      title: "Grade",
      dataIndex: "grade",
      width: "20%",
    },
    {
      title: "Vaccinated",
      dataIndex: "vaccinated",
    },
    {
      title: "Period(in Days)",
      dataIndex: "period",
    },
    {
      title: "Weight",
      dataIndex: "weight",
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
        <NavLink to={`${columns.rfid}`}>
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
      rfid: 1102147,
      grade: "A",
      vaccinated: "Yes",
      period: 12,
      weight: 22,
      status: "Active",
    },
    {
      key: 2,
      rfid: 1102147,
      grade: "A",
      vaccinated: "Yes",
      period: 12,
      weight: 22,
      status: "Active",
    },
    {
      key: 3,
      rfid: 1102147,
      grade: "A",
      vaccinated: "Yes",
      period: 12,
      weight: 22,
      status: "Active",
    },
    {
      key: 4,
      rfid: 1102147,
      grade: "A",
      vaccinated: "Yes",
      period: 12,
      weight: 22,
      status: "Active",
    },
  ];
  const menu = (
    <Menu>
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
    <div className="farm_info_content">
      <div className="farm_info_content_cards_container">
        <Row gutter={14}>
          <Col span={6}>
            <div className="farm_info_card"></div>
          </Col>
          <Col span={6}>
            <div className="farm_info_card"></div>
          </Col>
          <Col span={6}>
            <div className="farm_info_card"></div>
          </Col>
          <Col span={6}>
            <div className="farm_info_card"></div>
          </Col>
        </Row>
      </div>
      <div className="farm_info_goat_list_action">
        <div className="farm_info_goat_filter">
          <Dropdown overlay={menu}>
            <Button className="farm_info_goat_filter_button" size="large">
              Filter : All <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div className="farm_info_goat_search">
          <Search
            placeholder="Search by Goat Id"
            allowClear
            size="large"
            style={{ borderRadius: "4px", width: 264 }}
          />
        </div>
      </div>
      <div className="farm_info_goat_list_table">
        <Table
          style={{ width: "100%" }}
          columns={columns}
          dataSource={data}
          onChange={() => {}}
          bordered
        />
      </div>
    </div>
  );
}

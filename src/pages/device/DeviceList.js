import React, { useState } from "react";
import { Button, Dropdown, Menu, Input, Table, Modal } from "antd";
import { DownOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { editIcon } from "../../utils/constants";
import "./devicelist.css";
import AddDevice from "../adddevice/AddDevice";

const { Search } = Input;

export default function DeviceList() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleSearch = () => {};
  const handleMenuClick = () => {};
  const handleTableChange = () => {};

  const columns = [
    {
      title: "Machine Id",
      dataIndex: "machineid",
    },
    {
      title: "Machine Type",
      dataIndex: "machinetype",
    },
    {
      title: "Frim Ware Versions",
      dataIndex: "frimware",
    },
    {
      title: "Farm Name",
      dataIndex: "farmname",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "8%",
      render: (value, columns) => (
        <div className="action_button_div">
          <Button
            className="user_list_buttons"
            style={{ borderRadius: "4px" }}
            block
            type="primary"
            onClick={() => setIsEditModalVisible(true)}
            ghost
          >
            <img className="button_icon" src={editIcon} alt="edit icon" />
            Edit
          </Button>
        </div>
      ),
    },
  ];

  const data = [
    {
      machineid: "000000819263278",
      machinetype: "Weighing Machine",
      frimware: "11.09.22",
      farmname: "Red Hills Farm",
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
    <div className="device_list_main">
      <div className="device_list_action_area">
        <div className="device_list_filter_area">
          <Dropdown trigger={["click"]} overlay={menu}>
            <Button
              style={{ borderRadius: "4px", marginRight: 16 }}
              size="large"
            >
              <span className="filter_button_text">Farm : Redhills</span>
              <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown trigger={["click"]} overlay={menu}>
            <Button
              style={{ borderRadius: "4px", marginRight: 16 }}
              size="large"
            >
              <span className="filter_button_text">Device Type : All</span>
              <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown trigger={["click"]} overlay={menu}>
            <Button style={{ borderRadius: "4px" }} size="large">
              <span className="filter_button_text">Status : Active</span>
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div className="device_list_search_area">
          <Search
            placeholder="Search by Device Id"
            allowClear
            onSearch={handleSearch}
            size="large"
            style={{ borderRadius: "4px", width: 264, marginRight: "16px" }}
          />

          <Button
            style={{ borderRadius: "4px" }}
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => setIsModalVisible(true)}
          >
            <span className="button_text">Add New</span>
          </Button>
        </div>
      </div>
      <div className="device_list_table_area">
        <Table
          style={{ width: "100%" }}
          columns={columns}
          dataSource={data}
          onChange={handleTableChange}
          bordered
        />
      </div>
      <Modal
        width={478}
        title={["Basic Modal"]}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <AddDevice activeToggle={false} />
      </Modal>
      <Modal
        width={478}
        title={["Basic Modal"]}
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <AddDevice activeToggle={true} />
      </Modal>
    </div>
  );
}

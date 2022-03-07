import React, { useEffect, useState } from "react";
import { Button, Dropdown, Menu, Input, Table, Modal } from "antd";
import { DownOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { editIcon } from "../../utils/constants";
import "./devicelist.css";
import AddDevice from "../adddevice/AddDevice";
import tryCatch from "../../helper/tryCatch.helper";
import { getAllDevice } from "../../api/device.api";
import usePageInfo from "../../hooks/usePageInfo";

const { Search } = Input;

export default function DeviceList() {
  const { setPageTitle } = usePageInfo();
  const [isLoading, setIsLoading] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const [deviceTypeList, setDeviceTypeList] = useState([
    {
      device_type: 0,
      device_type_name: "All",
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleSearch = () => {};
  const handleMenuClick = () => {};
  const handleTableChange = () => {};
  const handleDeviceTypeChange = (value) => {
    console.log(value);
  };

  const getDeviceList = async () => {
    setIsLoading(true);
    const [deviceResponse, deviceError] = await tryCatch(getAllDevice());

    if (!deviceError) {
      const deviceDetails = deviceResponse.data.map((el) => ({
        ...el,
        key: el.id,
      }));
      const deviceTypes = deviceDetails
        .map((el) => ({
          device_type: el.device_type,
          device_type_name: el.device_type_name,
        }))
        .filter(
          (val, i, self) =>
            i === self.findIndex((t) => t.device_type === val.device_type)
        );
      setDeviceTypeList(deviceTypes);
      setDeviceList(deviceDetails);
      setIsLoading(false);
    } else {
      console.log(deviceError.response);
      setIsLoading(false);
    }
  };

  const columns = [
    {
      title: "Machine Id",
      dataIndex: "device_name",
    },
    {
      title: "Machine Type",
      dataIndex: "device_type_name",
    },
    {
      title: "Frim Ware Versions",
      dataIndex: "frimware_version",
      render: (value) => value || "-",
    },
    {
      title: "Farm Name",
      dataIndex: "farm_name",
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

  const deviceTypeMenu = (
    <Menu onClick={handleDeviceTypeChange}>
      {deviceTypeList.map((el) => (
        <Menu.Item key={el.device_type}>{el.device_type_name}</Menu.Item>
      ))}
    </Menu>
  );

  useEffect(() => {
    setPageTitle("Device List");
    getDeviceList();
  }, []);

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
          <Dropdown trigger={["click"]} overlay={deviceTypeMenu}>
            <Button
              style={{ borderRadius: "4px", marginRight: 16 }}
              size="large"
            >
              <span className="filter_button_text">Device Type : </span>
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
          loading={isLoading}
          style={{ width: "100%" }}
          columns={columns}
          dataSource={deviceList}
          onChange={handleTableChange}
          bordered
        />
      </div>
      <Modal
        width={478}
        title={["Add Device"]}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <AddDevice
          getDeviceList={getDeviceList}
          setIsModalVisible={setIsModalVisible}
          activeToggle={false}
        />
      </Modal>
      <Modal
        width={478}
        title={["Edit Device"]}
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <AddDevice activeToggle={true} />
      </Modal>
    </div>
  );
}

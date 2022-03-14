import React, { useEffect, useState } from "react";
import { Button, Dropdown, Menu, Input, Table, Modal } from "antd";
import { DownOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import { editIcon } from "../../utils/constants";
import "./devicelist.css";
import AddDevice from "../adddevice/AddDevice";
import tryCatch from "../../helper/tryCatch.helper";
import { getAllDeviceWithQuery } from "../../api/device.api";
import usePageInfo from "../../hooks/usePageInfo";
import useMasters from "../../hooks/useMasters";
import EditDevice from "../editdevice/EditDevice";

const { Search } = Input;

export default function DeviceList() {
  const { setPageTitle } = usePageInfo();
  const { farmMaster, deviceTypeMaster, fetchFarm } = useMasters();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState(0);
  const [selectedDeviceType, setSelectedDeviceType] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [deviceList, setDeviceList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editDeviceDetails, setEditDeviceDetails] = useState({});

  const handleSearch = () => {};

  const handleMenuClick = (value) => {
    const selectedValue = Number(value.key);
    setSelectedFarm(selectedValue);
    getDeviceList(selectedValue, selectedDeviceType, selectedStatus);
  };

  const handleDeviceTypeChange = (value) => {
    const selectedValue = Number(value.key);
    setSelectedDeviceType(selectedValue);
    getDeviceList(selectedFarm, selectedValue, selectedStatus);
  };

  const handleStatusMenuClick = (value) => {
    const selectedValue = Number(value.key);
    setSelectedStatus(selectedValue);
    getDeviceList(selectedFarm, selectedDeviceType, selectedValue);
  };

  const getDeviceList = async (
    farmid = 0,
    device = 0,
    status = 1,
    page = 1
  ) => {
    setIsLoading(true);
    const [deviceResponse, deviceError] = await tryCatch(
      getAllDeviceWithQuery(farmid, device, status, page)
    );

    if (!deviceError) {
      const deviceDetails = deviceResponse.data.data.map((el) => ({
        ...el,
        key: el.id,
      }));
      setTotalPages(deviceResponse.data.count);
      setDeviceList(deviceDetails);
      setIsLoading(false);
    } else {
      console.log(deviceError.response);
      setIsLoading(false);
    }
  };

  const columns = [
    {
      title: "Machine Type",
      dataIndex: "device_type_name",
    },
    {
      title: "Machine Name",
      dataIndex: "device_name",
    },
    // {
    //   title: "Machine Id",
    //   dataIndex: "device_id",
    // },
    {
      title: "Farm Name",
      dataIndex: "farm_name",
    },
    {
      title: "Firmware Versions",
      dataIndex: "firmware_version",
      render: (value) => value || "-",
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
            onClick={() => {
              setEditDeviceDetails(columns);
              setIsEditModalVisible(true);
            }}
            ghost
          >
            <img className="button_icon" src={editIcon} alt="edit icon" />
            Edit
          </Button>
        </div>
      ),
    },
  ];

  const statusMenu = (
    <Menu onClick={handleStatusMenuClick}>
      <Menu.Item key={1}>Active</Menu.Item>
      <Menu.Item key={0}>In Active</Menu.Item>
    </Menu>
  );

  const farmMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key={0}>All</Menu.Item>
      {farmMaster?.map((el) => (
        <Menu.Item key={el.id}>{el.farm_name}</Menu.Item>
      ))}
    </Menu>
  );

  const deviceTypeMenu = (
    <Menu onClick={handleDeviceTypeChange}>
      <Menu.Item key={0}>{"All"}</Menu.Item>
      {deviceTypeMaster?.map((el) => (
        <Menu.Item key={el.id}>{el.name}</Menu.Item>
      ))}
    </Menu>
  );

  useEffect(() => {
    setPageTitle("Device List");
    fetchFarm();
    getDeviceList();
  }, []);

  return (
    <div className="device_list_main">
      <div className="device_list_action_area">
        <div className="device_list_filter_area">
          <Dropdown trigger={["click"]} overlay={farmMenu}>
            <Button
              style={{ borderRadius: "4px", marginRight: 16 }}
              size="large"
            >
              <span className="filter_button_text">
                Farm :{" "}
                {!selectedFarm
                  ? "All"
                  : farmMaster.filter((f) => f.id === selectedFarm)[0]
                      .farm_name}
              </span>
              <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown trigger={["click"]} overlay={deviceTypeMenu}>
            <Button
              style={{ borderRadius: "4px", marginRight: 16 }}
              size="large"
            >
              <span className="filter_button_text">
                Device Type :{" "}
                {!selectedDeviceType
                  ? "All"
                  : deviceTypeMaster.filter(
                      (f) => f.id === selectedDeviceType
                    )[0].name}{" "}
              </span>
              <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown trigger={["click"]} overlay={statusMenu}>
            <Button style={{ borderRadius: "4px" }} size="large">
              <span className="filter_button_text">
                Status : {selectedStatus ? "Acitve" : "In Active"}
              </span>
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
          pagination={{
            total: totalPages,
            pageSize: 10,
            onChange: (page) => {
              getDeviceList(
                selectedFarm,
                selectedDeviceType,
                selectedStatus,
                page
              );
            },
          }}
          loading={isLoading}
          style={{ width: "100%" }}
          columns={columns}
          dataSource={deviceList}
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
        destroyOnClose={true}
        width={478}
        title={["Edit Device"]}
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <EditDevice
          setIsEditModalVisible={setIsEditModalVisible}
          deviceData={editDeviceDetails}
          getDeviceList={getDeviceList}
          activeToggle={true}
        />
      </Modal>
    </div>
  );
}

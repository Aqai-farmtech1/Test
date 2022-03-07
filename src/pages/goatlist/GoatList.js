import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import usePageInfo from "../../hooks/usePageInfo";
import { Dropdown, Button, Menu, Input, Table } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink, useParams } from "react-router-dom";
import { viewIcon } from "../../utils/constants";
import "./goatlist.css";
import tryCatch from "../../helper/tryCatch.helper";
import { getFarmGoat } from "../../api/goat.api";

const { Search } = Input;

export default function GoatList() {
  const [goatList, setGoatList] = useState([]);
  const { setPageTitle } = usePageInfo();
  const { farmid } = useParams();

  const handleMenuClick = () => {};
  const handleSearch = () => {};
  const handleTableChange = () => {};

  const getGoatList = async () => {
    const [goatResponse, goatError] = await tryCatch(getFarmGoat(farmid));
    if (!goatError) {
      setGoatList(goatResponse.data.data);
    } else {
      console.log(goatError.response);
    }
  };

  useEffect(() => {
    getGoatList();
  }, []);

  const columns = [
    {
      title: "Farm Code",
      dataIndex: "rfid",
    },
    {
      title: "Farm Name",
      dataIndex: "grade",
    },
    {
      title: "State",
      dataIndex: "tooth",
    },
    {
      title: "Product & Capacity",
      dataIndex: "breed",
    },
    {
      title: "Product & Capacity",
      dataIndex: "vaccination_status",
    },
    {
      title: "Product & Capacity",
      dataIndex: "period",
    },
    {
      title: "Product & Capacity",
      dataIndex: "current_weight",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "8%",
      render: (value, columns) => (
        <div className="action_button_div">
          <NavLink to={`${columns.farmcode}`}>
            <Button
              className="user_list_buttons"
              style={{ borderRadius: "4px" }}
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

  useEffect(() => {
    setPageTitle("Goats");
  }, []);
  return (
    <div className="goat_list_main">
      <BreadCrumb />
      <div className="goat_list_main_action_container">
        <Dropdown trigger={["click"]} overlay={menu}>
          <Button style={{ borderRadius: "4px" }} size="large">
            <span className="filter_button_text">Status : Ready to Sale</span>
            <DownOutlined />
          </Button>
        </Dropdown>
        <Search
          placeholder="Search by Goat RFID"
          allowClear
          onSearch={handleSearch}
          size="large"
          style={{ borderRadius: "4px", width: 264 }}
        />
      </div>
      <div className="goat_list_table_area">
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

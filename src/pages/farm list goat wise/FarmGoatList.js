import React, { useEffect, useState } from "react";
import { Button, Dropdown, Menu, Input, Table, Badge } from "antd";
import { DownOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import "./farmlistgoat.css";
import { NavLink } from "react-router-dom";
import PageTitle from "../../components/pagetitle/PageTitle";
import usePageInfo from "../../hooks/usePageInfo";
import tryCatch from "../../helper/tryCatch.helper";
import { getAllFarm } from "../../api/farm.api";

const { Search } = Input;

export default function FarmGoatList() {
  const [farmList, setFarmList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const { setPageTitle } = usePageInfo();

  const getFarmList = async () => {
    setIsLoading(true);
    const [farmResponse, farmError] = await tryCatch(getAllFarm());

    if (!farmError) {
      const alteredFarmList = farmResponse.data.data
        .map((el) => ({
          ...el,
          product_capacity: el.product_capacity.filter((f) => f.product === 3),
        }))
        .filter((fil) => fil.product_capacity.length)
        .map((ell) => ({
          ...ell,
          free_capacity: ell.product_capacity[0].capacity - ell.total_goats,
          sick: 0,
          mortality: 0,
          key: ell.id,
        }));
      setIsLoading(false);
      setFarmList(alteredFarmList);
    } else {
      setIsLoading(false);
      console.log(farmError.response);
    }
  };

  useEffect(() => {
    setPageTitle("Farm List - Goats");
    getFarmList();
  }, [setPageTitle]);

  const handleMenuClick = () => {};

  const handleSearch = () => {};

  const handleTableChange = () => {};

  const columns = [
    {
      title: "Farm Code",
      dataIndex: "code",
    },
    {
      title: "Farm Name",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "Location",
      dataIndex: "state_name",
    },
    {
      title: "Ready to Sale",
      dataIndex: "total_goats",
    },
    {
      title: "Free Capacity",
      dataIndex: "free_capacity",
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
      title: "Action",
      dataIndex: "action",
      width: "8%",
      render: (value, columns) => (
        <NavLink
          to={{
            pathname: `/goat/${columns.key}`,
          }}
        >
          <Button style={{ borderRadius: "4px" }} type="primary" ghost>
            View
          </Button>
        </NavLink>
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
                <span className="filter_button_text">Status : Active</span>
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
            <NavLink to="/createfarm">
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
          loading={isLoading}
          style={{ width: "100%" }}
          columns={columns}
          dataSource={farmList}
          onChange={handleTableChange}
          bordered
        />
      </div>
    </div>
  );
}

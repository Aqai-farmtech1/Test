import React, { useEffect, useState } from "react";
import { Button, Dropdown, Menu, Input, Table, Badge } from "antd";
import { DownOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import "./farmlistgoat.css";
import { NavLink } from "react-router-dom";
import PageTitle from "../../components/pagetitle/PageTitle";
import usePageInfo from "../../hooks/usePageInfo";
import tryCatch from "../../helper/tryCatch.helper";
import { getGoatFarms } from "../../api/farm.api";
import useMasters from "../../hooks/useMasters";
import { viewIcon } from "../../utils/constants";

const { Search } = Input;

export default function FarmGoatList() {
  const [farmList, setFarmList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedState, setSelectedState] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(1);
  const { setPageTitle } = usePageInfo();
  const { stateMaster } = useMasters();

  const getFarmList = async (page = 1, state = 0, status = 1) => {
    setIsLoading(true);
    const [farmResponse, farmError] = await tryCatch(
      getGoatFarms(page, state, status)
    );

    if (!farmError) {
      const alteredFarmList = farmResponse.data.data.map((ell) => ({
        ...ell,
        sick: 0,
        mortality: 0,
        key: ell.id,
      }));
      setTotalPages(farmResponse.data.count);
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

  const handleMenuClick = (value) => {
    setSelectedStatus(value.key);
    getFarmList(1, selectedState, value.key);
  };

  const handleStateMenuClick = (value) => {
    setSelectedState(Number(value.key));
    getFarmList(1, value.key, selectedStatus);
  };

  const handleSearch = () => {};

  const columns = [
    {
      title: "Farm Code",
      dataIndex: "farm_code",
    },
    {
      title: "Farm Name",
      dataIndex: "farm_name",
      width: "20%",
    },
    {
      title: "Location",
      dataIndex: "state_name",
    },
    {
      title: "Ready to Sale",
      dataIndex: "ready_to_sale",
    },
    {
      title: "Free Capacity",
      dataIndex: "remaining_capacity",
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
          <Button
            className="user_list_buttons"
            style={{ borderRadius: "4px" }}
            type="primary"
            ghost
          >
            <img className="button_icon" src={viewIcon} alt="view icon" />
            View
          </Button>
        </NavLink>
      ),
    },
  ];

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key={1}>Active</Menu.Item>
      <Menu.Item key={0}>In Active</Menu.Item>
    </Menu>
  );

  const stateMenu = (
    <Menu onClick={handleStateMenuClick}>
      <Menu.Item key={0}>{"All"}</Menu.Item>
      {stateMaster?.map((el) => (
        <Menu.Item key={el.id}>{el.name}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="farmlist">
      <div className="farmlist_action_area">
        <div className="action_filter_area">
          <div className="action_filter_state">
            <Dropdown trigger={["click"]} overlay={stateMenu}>
              <Button style={{ borderRadius: "4px" }} size="large">
                <span className="filter_button_text">
                  State :{" "}
                  {!selectedState
                    ? "All"
                    : stateMaster.filter((f) => f.id === selectedState)[0].name}
                </span>
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
          <div className="action_filter_city">
            <Dropdown trigger={["click"]} overlay={menu}>
              <Button size="large" style={{ borderRadius: "4px" }}>
                <span className="filter_button_text">
                  Status : {Number(selectedStatus) ? "Active" : "In Active"}
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
        </div>
      </div>
      <div className="farmlist_table">
        <Table
          loading={isLoading}
          rowClassName={(record, index) =>
            index % 2 === 0 ? "table-row-light" : "table-row-dark"
          }
          style={{ width: "100%" }}
          pagination={{
            total: totalPages,
            pageSize: 10,
            onChange: (page) => getFarmList(page),
          }}
          columns={columns}
          dataSource={farmList}
          bordered
        />
      </div>
    </div>
  );
}

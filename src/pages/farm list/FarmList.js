import React, { useEffect, useState, useContext } from "react";
import { Button, Dropdown, Menu, Input, Table, Badge } from "antd";
import { DownOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import "./farmlist.css";
import { NavLink } from "react-router-dom";
import { editIcon, viewIcon } from "../../utils/constants";
import usePageInfo from "../../hooks/usePageInfo";
import useMasters from "../../hooks/useMasters";
import tryCatch from "../../helper/tryCatch.helper";
import { getAllFarm } from "../../api/farm.api";

// import { PageInfoContext } from '../../contexts/PageInfoContext';
const { Search } = Input;

export default function FarmList() {
  const [selectedState, setSelectedState] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [farmList, setFarmList] = useState([]);
  const { productMaster } = useMasters();
  const { setPageTitle } = usePageInfo();
  // const { setAlert, contextCheck } = useContext(PageInfoContext);
  // const { setAlert } = this.contextType;

  const getFarmList = async () => {
    setIsLoading(true);
    const [farmResponse, farmError] = await tryCatch(getAllFarm());
    if (!farmError) {
      setIsLoading(false);
      const farmDataList = farmResponse.data.data.map((el) => ({
        code: el.code,
        key: el.id,
        name: el.name,
        state_name: el.state_name,
        product_capacity: el.product_capacity
          .map((e) =>
            productMaster
              .filter((f) => f.id === e.product)
              .map((m) => `${m.name}-${e.capacity}`)
              .join("")
          )
          .join(", "),
      }));
      setFarmList(farmDataList);
    } else {
      setIsLoading(false);
      console.log(farmError.response);
    }
  };

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
      title: "State",
      dataIndex: "state_name",
    },
    {
      title: "Product & Capacity",
      dataIndex: "product_capacity",
      render: (value) => (value ? value : "No Products"),
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
          <NavLink to={`/farm/${columns.key}`}>
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
    setPageTitle("Farm");
    getFarmList();
  }, [setPageTitle]);

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

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
import useMasters from "../../hooks/useMasters";

const { Search } = Input;

export default function GoatList() {
  const [isLoading, setIsLoading] = useState(false);
  const [goatList, setGoatList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const { setPageTitle } = usePageInfo();
  const { farmMaster } = useMasters();
  const { farmid } = useParams();

  const handleMenuClick = () => {};
  const handleSearch = () => {};
  const handleTableChange = () => {};

  const getGoatList = async (page = 1) => {
    setIsLoading(true);
    const [goatResponse, goatError] = await tryCatch(getFarmGoat(farmid, page));
    if (!goatError) {
      const alteredData = goatResponse.data.data.map((el) => ({
        ...el,
        key: el.id,
      }));
      setTotalPages(goatResponse.data.count);
      setIsLoading(false);
      // setPageTitle(alteredData[0]?.farm_name);
      setGoatList(alteredData);
    } else {
      setIsLoading(false);
      console.log(goatError.response);
    }
  };

  const columns = [
    {
      title: "RFID",
      dataIndex: "rfid",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      render: (value) => value || "-",
    },
    {
      title: "Tooth lost count",
      dataIndex: "tooth",
      render: (value) => value || "-",
    },
    {
      title: "Breed",
      dataIndex: "breed",
      render: (value) => value || "-",
    },
    {
      title: "Vaccination Status",
      dataIndex: "vaccination_status",
      render: (value) => (value ? "Yes" : "No"),
    },
    {
      title: "Period (in Days)",
      dataIndex: "total_days",
    },
    {
      title: "Weight",
      dataIndex: "current_weight",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "8%",
      render: (value, columns) => (
        <div className="action_button_div">
          <NavLink to={`/goat/${farmid}/${columns.key}`}>
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
    getGoatList();
    const farmName = farmMaster?.find(
      (el) => Number(el.id) === Number(farmid)
    )?.farm_name;
    setPageTitle(farmName);
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
          rowClassName={(record, index) =>
            index % 2 === 0 ? "table-row-light" : "table-row-dark"
          }
          loading={isLoading}
          pagination={{
            total: totalPages,
            pageSize: 10,
            onChange: (page) => {
              getGoatList(page);
            },
          }}
          style={{ width: "100%" }}
          columns={columns}
          dataSource={goatList}
          onChange={handleTableChange}
          bordered
        />
      </div>
    </div>
  );
}

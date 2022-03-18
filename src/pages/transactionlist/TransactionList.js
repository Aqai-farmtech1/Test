import React, { useEffect, useState } from "react";
import "./transactionlist.css";
import { Tabs, Input, Button, Dropdown, Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import SalesListTable from "./SalesListTable";
import PurchaseListTable from "./PurchaseListTable";
import usePageInfo from "../../hooks/usePageInfo";
import tryCatch from "../../helper/tryCatch.helper";
import { getAllSales } from "../../api/sales.api";
import { getAllPurchaseList } from "../../api/purchase.api";

const { Search } = Input;

const { TabPane } = Tabs;

export default function TransactionList() {
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [activeKey, setActiveKey] = useState("1");
  const [transactionData, setTransactionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  const currentTab = state?.activeTab || "1";
  const activeName = state?.activeName || "Sales";
  const activeLink = state?.activeLink || "sales";
  const {
    transactionName,
    transactionLink,
    setTransactionName,
    setTransactionLink,
    setPageTitle,
  } = usePageInfo();

  const handleTabChange = (value) => {
    const tabKey = Number(value);
    const { tabName, link } = tabDetails[tabKey];
    setActiveKey(value);
    setTransactionName(tabName);
    setTransactionLink(link);
    getTransactionList(value, 1, selectedStatus);
  };

  const handleSearch = () => {};

  const handleMenuClick = (value) => {
    setSelectedStatus(value.key);
    getTransactionList(activeKey, 1, value.key);
  };

  const getSalesList = async (page = 1, orderStatus = 0) => {
    setIsLoading(true);
    const [salesResponse, salesError] = await tryCatch(
      getAllSales(page, orderStatus)
    );

    if (!salesError) {
      setTransactionData(salesResponse.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      console.log(salesError.response);
    }
  };

  const getPurchaseList = async (page = 1, orderStatus = 0) => {
    setIsLoading(true);
    const [purchaseResponse, purchaseError] = await tryCatch(
      getAllPurchaseList(page, orderStatus)
    );

    if (!purchaseError) {
      setTransactionData(purchaseResponse.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      console.log(purchaseError.response);
    }
  };

  const getTransactionList = (tab, page, status) => {
    switch (Number(tab)) {
      case 1:
        getSalesList(page, status);
        break;
      case 2:
        getPurchaseList(page, status);
        break;
      default:
        console.log("transaction switch default error!");
        break;
    }
  };

  const tableActions = (
    <div className="transaction_search_area">
      <div className="transaction_search">
        <Search
          placeholder="Search by Name"
          allowClear
          onSearch={handleSearch}
          size="large"
          style={{ borderRadius: "4px", width: 264 }}
        />
      </div>
      <div className="transaction_create_new">
        <NavLink to={`/transactions/${transactionLink}/create`}>
          <Button
            style={{ borderRadius: "4px" }}
            type="primary"
            icon={<PlusOutlined />}
            size="large"
          >
            <span className="button_text">
              Create New {transactionName || ""}
            </span>
          </Button>
        </NavLink>
      </div>
    </div>
  );

  const tabDetails = {
    1: {
      tabName: "Sales",
      link: "sales",
    },
    2: {
      tabName: "Purchase",
      link: "purchase",
    },
    3: {
      tabName: "Transfer",
      link: "transfer",
    },
  };

  const orderStatusStatic = {
    0: "All",
    1: "Created",
    2: "Weighing",
    3: "Completed",
    4: "Cancelled",
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key={0}>All</Menu.Item>
      <Menu.Item key={1}>Created</Menu.Item>
      <Menu.Item key={2}>Weighing</Menu.Item>
      <Menu.Item key={3}>Completed</Menu.Item>
      <Menu.Item key={4}>Cancelled</Menu.Item>
    </Menu>
  );

  useEffect(() => {
    setTransactionName(activeName);
    setTransactionLink(activeLink);
    setActiveKey(currentTab);
    getTransactionList(currentTab, 1, selectedStatus);
    setPageTitle("Transactions List");
  }, [currentTab]);

  return (
    <div className="transaction_main">
      <Tabs
        activeKey={activeKey}
        tabBarExtraContent={tableActions}
        defaultActiveKey="1"
        onChange={handleTabChange}
      >
        <div className="transaction_list_filter_area">
          <Dropdown trigger={["click"]} overlay={menu}>
            <Button size="large" style={{ borderRadius: "4px" }}>
              <span className="filter_button_text">
                Status : {orderStatusStatic[selectedStatus]}
              </span>
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <TabPane destroyInactiveTabPane tab="Sales" key="1">
          <div className="transaction_table">
            <SalesListTable
              transactionData={transactionData}
              getTransactionList={getTransactionList}
              selectedStatus={selectedStatus}
              isLoading={isLoading}
            />
          </div>
        </TabPane>
        <TabPane destroyInactiveTabPane tab="Purchase" key="2">
          <div className="transaction_table">
            <PurchaseListTable
              transactionData={transactionData}
              getTransactionList={getTransactionList}
              selectedStatus={selectedStatus}
              isLoading={isLoading}
            />
          </div>
        </TabPane>
        <TabPane disabled tab="Transfer" key="3">
          <div className="transaction_table"></div>
        </TabPane>
      </Tabs>
    </div>
  );
}

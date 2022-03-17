import { Button, Table } from "antd";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./transactionlist.css";
import { editIcon, viewIcon } from "../../utils/constants";
import usePageInfo from "../../hooks/usePageInfo";

export default function PurchaseListTable({
  transactionData,
  getTransactionList,
  selectedStatus,
  isLoading,
}) {
  const { data, count } = transactionData;
  const keyAddedData = data?.map((el) => ({
    ...el,
    key: el.id,
    quantity: el.product_quantity.quantity,
    price_per_kg: el.product_quantity.price_per_kg,
  }));

  const columns = [
    {
      title: "P.O Number",
      dataIndex: "purchase_order_id",
    },
    {
      title: "Farm",
      dataIndex: "farm_name",
    },
    {
      title: "Vendor Name",
      dataIndex: "vendor",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Price Per Kg",
      dataIndex: "price_per_kg",
      render: (value) => `₹ ${value}`,
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "6%",
      render: (value, columns) => (
        <div className="action_button_div">
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
          {/* <NavLink to={`/user/edit/${columns.key}`}>
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
          <NavLink to={`/user/view/${columns.key}`}>
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
          </NavLink> */}
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        bordered
        loading={isLoading}
        pagination={{
          total: count,
          pageSize: 10,
          onChange: (page) => getTransactionList("2", page, selectedStatus),
        }}
        style={{ width: "100%" }}
        columns={columns}
        dataSource={keyAddedData}
      />
    </>
  );
}

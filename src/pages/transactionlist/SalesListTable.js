import { Button, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./transactionlist.css";
import { editIcon, viewIcon } from "../../utils/constants";
import usePageInfo from "../../hooks/usePageInfo";
import EditSalesOrder from "../createsaleorder/EditSalesOrder";

export default function SalesListTable({
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
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [productCapacity, setProductCapacity] = useState(0);
  const [orderId, setOrderId] = useState(0);

  const columns = [
    {
      title: "S.O Number",
      dataIndex: "sales_order_id",
    },
    {
      title: "Batch Id",
      dataIndex: "batch_id",
    },
    {
      title: "Farm",
      dataIndex: "farm_name",
    },
    {
      title: "Customer Name",
      dataIndex: "customer",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Total Weight(In Kg)",
      dataIndex: "total_weight",
      render: (value) => value || "-",
    },
    {
      title: "Price Per Kg",
      dataIndex: "price_per_kg",
      render: (value) => `₹ ${value}`,
    },
    {
      title: "Status",
      dataIndex: "order_status_name",
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
            onClick={() => {
              setProductCapacity(columns.quantity);
              setIsEditModalVisible(true);
              setOrderId(columns.key);
            }}
            ghost
          >
            <img className="button_icon" src={editIcon} alt="edit icon" />
            Edit
          </Button>
          <NavLink to={`/transactions/sales/${columns.key}`}>
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

  return (
    <>
      <Table
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
        loading={isLoading}
        pagination={{
          total: count,
          pageSize: 10,
          onChange: (page) => getTransactionList("1", page, selectedStatus),
        }}
        bordered
        style={{ width: "100%" }}
        columns={columns}
        dataSource={keyAddedData}
      />
      <Modal
        visible={isEditModalVisible}
        title={null}
        footer={null}
        onCancel={() => setIsEditModalVisible(false)}
      >
        <EditSalesOrder
          getTransactionList={getTransactionList}
          selectedStatus={selectedStatus}
          productCapacity={productCapacity}
          orderId={orderId}
          setIsEditModalVisible={setIsEditModalVisible}
        />
      </Modal>
    </>
  );
}

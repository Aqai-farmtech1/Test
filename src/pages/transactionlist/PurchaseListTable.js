import { Button, Table, Tag } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./transactionlist.css";
import { editIcon, viewIcon } from "../../utils/constants";
import usePageInfo from "../../hooks/usePageInfo";
import Modal from "antd/lib/modal/Modal";
import EditPurchaseOrder from "../createpurchaseorder/EditPurchaseOrder";

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
  }));
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [productCapacity, setProductCapacity] = useState(0);
  const [orderId, setOrderId] = useState(0);

  const statusTags = {
    1: "warning",
    2: "processing",
    3: "success",
    4: "default",
  };

  const columns = [
    {
      title: "P.O Number",
      dataIndex: "purchase_order_id",
    },
    {
      title: "Batch Id",
      dataIndex: "batch_id",
      render: (value) => value || "-",
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
      title: "Total Weight(In Kg)",
      dataIndex: "total_weight",
      render: (value) => value || "-",
    },
    {
      title: "Price Per Kg",
      dataIndex: "price_per_kg",
      render: (value) => (value ? `₹ ${value}` : "-"),
    },
    {
      title: "Status",
      dataIndex: "order_status_name",
      render: (value, columns) => (
        <Tag color={statusTags[columns.order_status]}>{value}</Tag>
      ),
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
            onClick={() => {
              setIsEditModalVisible(true);
              setOrderId(columns.key);
              setProductCapacity(columns.quantity);
            }}
          >
            <img className="button_icon" src={editIcon} alt="edit icon" />
            Edit
          </Button>
          <NavLink to={`/transactions/purchase/${columns.key}`}>
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
      <Modal
        visible={isEditModalVisible}
        title={null}
        footer={null}
        onCancel={() => setIsEditModalVisible(false)}
      >
        <EditPurchaseOrder
          productCapacity={productCapacity}
          orderId={orderId}
          setIsEditModalVisible={setIsEditModalVisible}
          getTransactionList={getTransactionList}
          selectedStatus={selectedStatus}
        />
      </Modal>
    </>
  );
}

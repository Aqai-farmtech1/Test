import { Button, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSalesOrderDetail } from "../../api/sales.api";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import tryCatch from "../../helper/tryCatch.helper";
import usePageInfo from "../../hooks/usePageInfo";
import { editIconWhite } from "../../utils/constants";
import EditSalesOrder from "./EditSalesOrder";
import ViewOrderListItem from "./ViewOrderListItem";

export default function ViewSalesOrder() {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [salesOrderData, setSalesOrderData] = useState({});
  const { salesid } = useParams();
  const { setPageTitle } = usePageInfo();

  const getSalesDetail = async () => {
    message.loading({
      content: "Fetching Sales Order Details...",
      key: "salesOrder",
      duration: 0,
    });
    const [salesResponse, salesError] = await tryCatch(
      getSalesOrderDetail(salesid)
    );
    if (!salesError) {
      message.success({
        content: "Sales Order Details fetched successfully!",
        key: "salesOrder",
        duration: 0.3,
      });
      setPageTitle(`Sales Order - ${salesResponse.data.sales_order_id}`);
      setSalesOrderData(salesResponse.data);
    } else {
      const errors = salesError.response.data.error;
      for (let err in errors) {
        const errorMessage = errors[err][0];
        message.error({ content: errorMessage, key: "salesOrder" });
      }
    }
  };

  useEffect(() => {
    getSalesDetail();
    setPageTitle("Sales Order");
  }, []);

  return (
    <>
      <BreadCrumb />
      <div className="view_order_main">
        <h1>S.O Details</h1>
        <ViewOrderListItem
          title={"S.O Number"}
          value={salesOrderData.sales_order_id}
        />
        <ViewOrderListItem
          title={"Farm Name"}
          value={salesOrderData.farm_name}
        />
        <ViewOrderListItem
          title={"Order Status"}
          value={salesOrderData.order_status_name}
        />
        <ViewOrderListItem
          title={"Sales Date"}
          value={new Date(salesOrderData?.sales_date).toLocaleDateString()}
        />
        <h1>Product Info</h1>
        <ViewOrderListItem
          title={"Product"}
          value={salesOrderData?.product_name}
        />
        <ViewOrderListItem
          title={"Batch Id"}
          value={salesOrderData?.batch_id || "-"}
        />
        <ViewOrderListItem
          title={"Quantity"}
          value={salesOrderData?.quantity}
        />
        <ViewOrderListItem
          title={"Price Per Kg"}
          value={`₹ ${salesOrderData?.price_per_kg}`}
        />
        <h1>Customer Info</h1>
        <ViewOrderListItem title={"Name"} value={salesOrderData.customer} />
        <ViewOrderListItem
          title={"Mobile No"}
          value={salesOrderData.customer_phone_number}
        />
        <div className="order_edit_button">
          <Button
            className="user_list_buttons"
            style={{ borderRadius: "4px" }}
            block
            type="primary"
            onClick={() => setIsEditModalVisible(true)}
          >
            <img className="button_icon" src={editIconWhite} alt="edit icon" />
            Edit
          </Button>
        </div>
      </div>
      <Modal
        visible={isEditModalVisible}
        title={null}
        footer={null}
        onCancel={() => setIsEditModalVisible(false)}
      >
        <EditSalesOrder
          productCapacity={salesOrderData?.quantity || 0}
          getSalesDetail={getSalesDetail}
          orderId={salesid}
          setIsEditModalVisible={setIsEditModalVisible}
        />
      </Modal>
    </>
  );
}

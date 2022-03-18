import React, { useEffect, useState } from "react";
import { Button, message, Modal } from "antd";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import { editIconWhite } from "../../utils/constants";
import EditPurchaseOrder from "./EditPurchaseOrder";
import ViewOrderListItem from "../createsaleorder/ViewOrderListItem";
import { getPurchaseOrderDetail } from "../../api/purchase.api";
import tryCatch from "../../helper/tryCatch.helper";
import { useParams } from "react-router-dom";
import usePageInfo from "../../hooks/usePageInfo";

export default function ViewPurchaseOrder() {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [purchaseOrderData, setPurchaseOrderData] = useState({});
  const { setPageTitle } = usePageInfo();
  const { purchaseid } = useParams();

  const getPurchaseDetail = async () => {
    message.loading({
      content: "Fetching Purchase Order Details...",
      key: "purchaseOrder",
      duration: 0,
    });
    const [purchaseResponse, purchaseError] = await tryCatch(
      getPurchaseOrderDetail(purchaseid)
    );

    if (!purchaseError) {
      message.success({
        content: "Purchase Order Details fetched successfully!",
        key: "purchaseOrder",
        duration: 0.3,
      });
      setPurchaseOrderData(purchaseResponse.data);
      setPageTitle(
        `Purchase Order - ${purchaseResponse.data.purchase_order_id}`
      );
    } else {
      const errors = purchaseError.response.data.error;
      for (let err in errors) {
        const errorMessage = errors[err][0];
        message.error({ content: errorMessage, key: "purchaseOrder" });
      }
    }
  };

  useEffect(() => {
    getPurchaseDetail();
  }, []);

  return (
    <>
      <BreadCrumb />
      <div className="view_order_main">
        <h1>S.O Details</h1>
        <ViewOrderListItem
          title={"S.O Number"}
          value={purchaseOrderData.purchase_order_id}
        />
        <ViewOrderListItem
          title={"Farm Name"}
          value={purchaseOrderData.farm_name}
        />
        <ViewOrderListItem
          title={"Order Status"}
          value={purchaseOrderData.order_status_name}
        />
        <ViewOrderListItem
          title={"Sales Date"}
          value={new Date(
            purchaseOrderData?.purchase_date
          ).toLocaleDateString()}
        />
        <h1>Product Info</h1>
        <ViewOrderListItem
          title={"Product"}
          value={purchaseOrderData?.product_name}
        />
        <ViewOrderListItem
          title={"Batch Id"}
          value={purchaseOrderData?.batch_id || "-"}
        />
        <ViewOrderListItem
          title={"Quantity"}
          value={purchaseOrderData?.quantity}
        />
        <ViewOrderListItem
          title={"Price Per Kg"}
          value={`₹ ${purchaseOrderData?.price_per_kg}`}
        />
        <h1>Customer Info</h1>
        <ViewOrderListItem title={"Name"} value={purchaseOrderData.vendor} />
        <ViewOrderListItem
          title={"Mobile No"}
          value={purchaseOrderData.vendor_phone_number}
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
        <EditPurchaseOrder
          productCapacity={purchaseOrderData?.quantity || 0}
          orderId={purchaseid}
          setIsEditModalVisible={setIsEditModalVisible}
          getPurchaseDetail={getPurchaseDetail}
        />
      </Modal>
    </>
  );
}

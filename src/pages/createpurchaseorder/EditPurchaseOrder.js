import React, { useState } from "react";
import { Form, Button, InputNumber, message } from "antd";
import "./createpurchaseorder.css";
import tryCatch from "../../helper/tryCatch.helper";
import { updatePurchaseQuantity } from "../../api/purchase.api";

export default function EditPurchaseOrder({
  productCapacity,
  orderId,
  setIsEditModalVisible,
  selectedStatus,
  getTransactionList,
  getPurchaseDetail,
}) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  form.setFieldsValue({
    quantity: productCapacity,
  });

  const handleFormSubmit = async (value) => {
    setIsLoading(true);
    message.loading({
      content: "Updating Order Quantity...",
      key: "updateOrder",
      duration: 0,
    });
    const [orderUpdateResponse, orderUpdateError] = await tryCatch(
      updatePurchaseQuantity(orderId, value)
    );

    if (!orderUpdateError) {
      setIsLoading(false);
      message.success({
        content: "Order Quantity Updated Successfully!",
        key: "updateOrder",
        duration: 0.3,
      });
      getTransactionList && getTransactionList("2", 1, selectedStatus);
      getPurchaseDetail && getPurchaseDetail();
      setIsEditModalVisible(false);
    } else {
      setIsLoading(false);
      const errors = orderUpdateError.response.data.error;
      for (let err in errors) {
        const errorMessage = errors[err][0];
        message.error({ content: errorMessage, key: "updateOrder" });
      }
    }
  };

  return (
    <div className="edit_purchase_main">
      <h1>Edit P.O</h1>
      <Form
        form={form}
        style={{ width: "100%" }}
        layout="vertical"
        onFinish={handleFormSubmit}
      >
        <Form.Item
          className="create_farm_form_item"
          name="quantity"
          label="Quantity"
          rules={[
            { required: true, message: "Please enter product quantity!" },
          ]}
        >
          <InputNumber
            className="farm_code_input"
            size="large"
            placeholder="Enter Product Capacity"
          />
        </Form.Item>
        <Form.Item>
          <Button
            loading={isLoading}
            style={{ padding: "9px 38px", height: "auto" }}
            className="update_po_button"
            type="primary"
            htmlType="submit"
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

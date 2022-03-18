import React, { useState } from "react";
import { Button, Form, Input, InputNumber, message } from "antd";
import "./createsalesorder.css";
import { updateSalesQuantity } from "../../api/sales.api";
import tryCatch from "../../helper/tryCatch.helper";

export default function EditSalesOrder({
  productCapacity,
  orderId,
  getSalesDetail,
  setIsEditModalVisible,
  selectedStatus,
  getTransactionList,
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
      updateSalesQuantity(orderId, value)
    );

    if (!orderUpdateError) {
      setIsLoading(false);
      message.success({
        content: "Order Quantity Updated Successfully!",
        key: "updateOrder",
        duration: 0.3,
      });
      getTransactionList && getTransactionList("1", 1, selectedStatus);
      getSalesDetail && getSalesDetail();
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
    <div className="edit_sales_main">
      <h1>Edit S.O</h1>
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
        <Button
          loading={isLoading}
          style={{ padding: "9px 38px", height: "auto" }}
          className="update_so_button"
          type="primary"
          htmlType="submit"
        >
          Update
        </Button>
      </Form>
    </div>
  );
}

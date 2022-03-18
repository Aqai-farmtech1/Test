import axios from "axios";

export const getAllPurchaseList = (page, orderStatus) => {
  const orderStatusQuery = Number(orderStatus) ? `&status=${orderStatus}` : "";
  return axios({
    method: "GET",
    url: `v1/farm/purchase-order/?page=${page}${orderStatusQuery}`,
  });
};

export const createPurchase = (data) =>
  axios({
    method: "POST",
    url: "v1/farm/purchase-order/",
    data,
  });

export const getPurchaseOrderDetail = (purchaseid) =>
  axios({
    method: "GET",
    url: `v1/farm/purchase-order/${purchaseid}/`,
  });

export const updatePurchaseQuantity = (purchaseid, data) =>
  axios({
    method: "PATCH",
    url: `v1/farm/purchase-order/${purchaseid}/`,
    data,
  });

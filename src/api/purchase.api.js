import axios from "axios";

export const getAllPurchaseList = (page, orderStatus) => {
  const orderStatusQuery = Number(orderStatus)
    ? `&orderstatus=${orderStatus}`
    : "";
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

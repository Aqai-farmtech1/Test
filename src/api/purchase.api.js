import axios from "axios";

export const getAllPurchaseList = (page, status) =>
  axios({
    method: "GET",
    url: `v1/farm/purchase-order/?page=${page}&status=${status}`,
  });

export const createPurchase = (data) =>
  axios({
    method: "POST",
    url: "v1/farm/purchase-order/",
    data,
  });

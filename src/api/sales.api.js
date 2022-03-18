import axios from "axios";

export const createSalesOrder = (data) =>
  axios({
    method: "POST",
    url: "v1/farm/sales-order/",
    data,
  });

export const getAllSales = (page, orderStatus) => {
  const orderStatusQuery = Number(orderStatus) ? `&status=${orderStatus}` : "";
  return axios({
    method: "GET",
    url: `v1/farm/sales-order/?page=${page}${orderStatusQuery}`,
  });
};

export const getSalesOrderDetail = (salesid) =>
  axios({
    method: "GET",
    url: `v1/farm/sales-order/${salesid}`,
  });

export const updateSalesQuantity = (salesid, data) =>
  axios({
    method: "PATCH",
    url: `v1/farm/sales-order/${salesid}/`,
    data,
  });

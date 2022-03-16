import axios from "axios";

export const createSalesOrder = (data) =>
  axios({
    method: "POST",
    url: "v1/farm/sales-order/",
    data,
  });

export const getAllSales = (page, status) =>
  axios({
    method: "GET",
    url: `v1/farm/sales-order/?page=${page}&status=${status}`,
  });

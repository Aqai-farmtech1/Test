import axios from "axios";

const USER_DEV_URL = process.env.REACT_APP_USER_DEV_URL;

export const getStateList = (token) =>
  axios({
    method: "GET",
    url: `${USER_DEV_URL}v1/state/101/`,
    headers: {
      Authorization: `Token ${token}`,
    },
  });

export const getDesignationList = (token) =>
  axios({
    method: "GET",
    url: `${USER_DEV_URL}v1/designation/`,
    headers: {
      Authorization: `Token ${token}`,
    },
  });

export const getProductList = (token) =>
  axios({
    method: "GET",
    url: "v1/core/product/",
    headers: {
      Authorization: `Token ${token}`,
    },
  });

export const getDeviceTypeList = (token) =>
  axios({
    method: "GET",
    url: "v1/core/device-type/",
    headers: {
      Authorization: `Token ${token}`,
    },
  });

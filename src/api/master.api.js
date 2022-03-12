import axios from "axios";

const USER_DEV_URL = process.env.REACT_APP_USER_DEV_URL;

export const getStateList = () =>
  axios({
    method: "GET",
    url: `${USER_DEV_URL}v1/state/101/`,
  });

export const getDesignationList = () =>
  axios({
    method: "GET",
    url: `${USER_DEV_URL}v1/designation/`,
  });

export const getProductList = () =>
  axios({
    method: "GET",
    url: "v1/core/product/",
  });

export const getDeviceTypeList = () =>
  axios({
    method: "GET",
    url: "v1/core/device-type/",
  });

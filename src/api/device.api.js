import axios from "axios";

export const getAllDevice = () =>
  axios({
    method: "GET",
    url: "v1/farm/device",
  });

export const createDevice = (data) =>
  axios({
    method: "POST",
    url: "v1/farm/device/",
    data,
  });

export const getFarmDevice = (farmid) =>
  axios({
    method: "GET",
    url: `v1/farm/farm-device/${farmid}/`,
  });

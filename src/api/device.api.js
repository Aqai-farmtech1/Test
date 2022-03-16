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

export const getAllDeviceWithQuery = (
  farmid,
  deviceType,
  status,
  search,
  page
) => {
  const farmQuery = Number(farmid) ? `&farm=${farmid}` : "";
  const deviceTypeQuery = Number(deviceType)
    ? `&device-type=${deviceType}`
    : "";
  const searchQuery = search ? `&search=${search}` : "";

  return axios({
    method: "GET",
    url: `v1/farm/device-list/?status=${status}&page=${page}${farmQuery}${deviceTypeQuery}${searchQuery}`,
  });
};

export const updateDevice = (deviceId, data) =>
  axios({
    method: "PUT",
    url: `v1/farm/farm-device-update/${deviceId}/`,
    data,
  });

export const getDevice = (deviceId) =>
  axios({
    method: "GET",
    url: `v1/farm/device/${deviceId}/`,
  });

export const updateDeviceStatus = (deviceId) =>
  axios({
    method: "PATCH",
    url: `v1/farm/device/${deviceId}/`,
  });

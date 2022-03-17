import axios from "axios";

export const searchVendor = (phone) => {
  const searchQuery = phone ? `?search=${phone}` : "";

  return axios({
    method: "GET",
    url: `v1/farm/vendor-filter/${searchQuery}`,
  });
};

export const createVendor = (data) =>
  axios({
    method: "POST",
    url: "v1/core/vendor/",
    data,
  });

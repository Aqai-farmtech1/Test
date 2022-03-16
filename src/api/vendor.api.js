import axios from "axios";

export const searchVendor = (phone) => {
  const searchQuery = phone ? `?search=${phone}` : "";

  return axios({
    method: "GET",
    url: `v1/farm/vendor-filter/${searchQuery}`,
  });
};

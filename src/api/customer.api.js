import axios from "axios";

export const searchCustomer = (phone) => {
  const searchQuery = phone ? `?search=${phone}` : "";

  return axios({
    method: "GET",
    url: `v1/farm/customer-filter/${searchQuery}`,
  });
};

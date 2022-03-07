import axios from "axios";

export const getFarmGoat = (farmid) =>
  axios({
    method: "GET",
    url: `v1/goat/farm-goat-list/?farm=${farmid}/`,
  });

export const getGoatInfo = () =>
  axios({
    method: "GET",
    url: `v1/goat/goat-weight_history/41/`,
  });

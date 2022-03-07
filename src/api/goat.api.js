import axios from "axios";

export const getFarmGoat = (farmid) =>
  axios({
    method: "GET",
    url: `v1/goat/farm-goat-list/?farm=1`,
  });

export const getGoatInfo = () =>
  axios({
    method: "GET",
    url: `v1/goat/goat-weight_history/41/`,
  });

import axios from "axios";

export const getFarmGoat = (farmid, page) =>
  axios({
    method: "GET",
    url: `v1/goat/farm-goat-list/?farm=${farmid}&page=${page}`,
  });

export const getGoatInfo = (goatid, farmid) =>
  axios({
    method: "GET",
    url: `v1/goat/goat-weight_history/${goatid}/?farm=${farmid}`,
  });

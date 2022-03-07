import axios from "axios";

export const getFarmUsers = (farmid) =>
  axios({
    method: "GET",
    url: `v1/farm/farm-user-list/?farm=${farmid}`,
  });

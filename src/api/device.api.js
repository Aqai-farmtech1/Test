import axios from "axios";

export const getAllDevice = () =>
  axios({
    method: "GET",
    url: "v1/farm/device",
  });

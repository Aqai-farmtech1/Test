import axios from "axios";

export const createFarm = (data) =>
  axios({
    method: "POST",
    url: "v1/farm/farm/",
    data,
  });

export const getAllFarm = () =>
  axios({
    method: "GET",
    url: "v1/farm/farm",
  });

export const getFarm = (id) =>
  axios({
    method: "GET",
    url: `v1/farm/farm/${id}`,
  });

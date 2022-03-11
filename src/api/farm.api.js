import axios from "axios";

export const createFarm = (data) =>
  axios({
    method: "POST",
    url: "v1/farm/farm/",
    data,
  });

export const getAllFarm = (page, state, status) => {
  const stateQuery = Number(state) ? `&state=${state}` : "";
  return axios({
    method: "GET",
    url: `v1/farm/farm/?page=${page}${stateQuery}&status=${status}`,
  });
};

export const getFarm = (id) =>
  axios({
    method: "GET",
    url: `v1/farm/farm/${id}`,
  });

export const getGoatFarms = (page, state, status) => {
  const stateQuery = Number(state) ? `&state=${state}` : "";
  return axios({
    method: "GET",
    url: `v1/farm/farm-goat/?page=${page}${stateQuery}&status=${status}`,
  });
};

export const getAllFarmList = () =>
  axios({
    method: "GET",
    url: "v1/farm/farm-list/",
  });

export const updateFarm = (farmid, data) =>
  axios({
    method: "PUT",
    url: `v1/farm/farm-update/${farmid}/`,
    data,
  });

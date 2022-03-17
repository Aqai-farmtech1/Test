import axios from "axios";

const USER_DEV_URL = process.env.REACT_APP_USER_DEV_URL;

export const getFarmUsers = (farmid) =>
  axios({
    method: "GET",
    url: `v1/farm/farm-user-list/?farm=${farmid}`,
  });

export const getUserProfile = () =>
  axios({
    method: "GET",
    url: `${USER_DEV_URL}v1/user-info/`,
  });

export const updateProfile = (data) =>
  axios({
    method: "PUT",
    url: `${USER_DEV_URL}v1/user-update/`,
    data,
  });

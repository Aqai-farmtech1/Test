import axios from "axios";

const USER_DEV_URL = process.env.REACT_APP_USER_DEV_URL;

export const checkToken = (token) =>
  axios({
    method: "GET",
    url: `${USER_DEV_URL}v1/user-info/`,
    headers: {
      Authorization: `Token ${token}`,
    },
  });

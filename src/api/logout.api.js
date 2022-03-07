import axios from "axios";

const USER_DEV_URL = process.env.REACT_APP_USER_DEV_URL;

export const logout = (token) =>
  axios({
    method: "GET",
    url: `${USER_DEV_URL}v1/logout`,
    headers: {
      Authorization: `Token ${token}`,
    },
  });

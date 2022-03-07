import axios from "axios";

const USER_DEV_URL = process.env.REACT_APP_USER_DEV_URL;

export const login = (data) =>
  axios({
    method: "POST",
    url: `${USER_DEV_URL}v1/login/`,
    data,
    headers: {
      Authorization: " ",
    },
  });

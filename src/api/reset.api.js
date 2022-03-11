import axios from "axios";

const REACT_APP_USER_DEV_URL = process.env.REACT_APP_USER_DEV_URL;

export const mailResetPassword = (data) =>
  axios({
    method: "POST",
    url: `${REACT_APP_USER_DEV_URL}v1/forgot-password/`,
    data,
  });

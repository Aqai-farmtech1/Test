import axios from "axios";

export const login = (data) =>
  axios({
    method: "POST",
    url: "/v1/login",
    data,
  });

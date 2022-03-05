import axios from "axios";

export const login = (data) =>
  axios({
    method: "POST",
    url: "http://1c36-2405-201-e02b-10ae-8530-f265-e2f1-f241.ngrok.io/v1/login/",
    data,
  });

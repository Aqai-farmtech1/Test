import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_FARM_DEV_URL;

axios.interceptors.response.use(
  function (response) {
    // console.log(response);
    return response;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

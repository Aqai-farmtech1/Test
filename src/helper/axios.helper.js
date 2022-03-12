import { message } from "antd";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_FARM_DEV_URL;

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

export const setupAxiosInterceptor = (navigate) => {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const handleInvalidToken = () => {
        const statusCode = error.response.status;

        if (statusCode === 401) {
          message.error({
            content: "Token Expired...!",
          });
          localStorage.removeItem("token");
          navigate("/login");
        }
      };

      handleInvalidToken();
      return Promise.reject(error);
    }
  );
};

import axios from "axios";

const token = localStorage.getItem("token") || "";

axios.defaults.baseURL = process.env.REACT_APP_FARM_DEV_URL;
axios.defaults.headers.common["Authorization"] = `Token ${token}`;

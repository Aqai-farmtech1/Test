import axios from "axios";

export const farmList = (data) =>
    axios({
        method: "POST",
        url: "/v1/login",
        data,
    });
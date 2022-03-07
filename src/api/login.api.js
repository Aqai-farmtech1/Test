import axios from "axios";

export const login = (data) =>
  axios({
    method: "POST",
    url: "https://aqgromalin-user-dev-ta5iabl3za-el.a.run.app/v1/login/",
    data,
  });

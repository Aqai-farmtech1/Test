import { checkToken } from "../api/checktoken.api";
import tryCatch from "./tryCatch.helper";

export const checkTokenValidity = async (navigate, fetchMasters, pathname) => {
  const token = localStorage.getItem("token");

  if (token) {
    const [tokenResponse, tokenError] = await tryCatch(checkToken(token));

    if (!tokenError) {
      fetchMasters(token);
      navigate(pathname);
    } else {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }
};

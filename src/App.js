import React, { useEffect } from "react";

import "antd/dist/antd.css";
import "./helper/axios.helper";
import PageInfoProvider from "./contexts/PageInfoProvider";
import useMaster from "./hooks/useMasters";
import Routing from "./router/Routing";
import tryCatch from "./helper/tryCatch.helper";
import { checkToken } from "./api/checktoken.api";
import { useLocation, useNavigate } from "react-router-dom";
import { setupAxiosInterceptor } from "./helper/axios.helper";

function App() {
  const { fetchMasters } = useMaster();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const checkTokenValidity = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const [tokenResponse, tokenError] = await tryCatch(checkToken(token));
      console.log(tokenResponse.data);
      if (!tokenError) {
        fetchMasters(token);
        navigate(pathname);
      } else {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    setupAxiosInterceptor(navigate);
    checkTokenValidity();
  }, []);

  return (
    <>
      <PageInfoProvider>
        <Routing />
      </PageInfoProvider>
    </>
  );
}

export default App;

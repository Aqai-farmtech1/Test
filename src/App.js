import React, { useEffect } from "react";

import "antd/dist/antd.css";
import "./helper/axios.helper";
import PageInfoProvider from "./contexts/PageInfoProvider";
import useMaster from "./hooks/useMasters";
import Routing from "./router/Routing";
import tryCatch from "./helper/tryCatch.helper";
import { checkToken } from "./api/checktoken.api";
import { useNavigate } from "react-router-dom";

function App() {
  const { fetchMasters } = useMaster();
  const navigate = useNavigate();

  const checkTokenValidity = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const [tokenResponse, tokenError] = await tryCatch(checkToken(token));

      if (!tokenError) {
        fetchMasters(token);
        navigate("/");
      } else {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
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

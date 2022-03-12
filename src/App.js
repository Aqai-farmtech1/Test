import React, { useEffect } from "react";

import "antd/dist/antd.css";
import "./helper/axios.helper";
import PageInfoProvider from "./contexts/PageInfoProvider";
import useMaster from "./hooks/useMasters";
import Routing from "./router/Routing";
import { useLocation, useNavigate } from "react-router-dom";
import { setupAxiosInterceptor } from "./helper/axios.helper";
import { checkTokenValidity } from "./helper/checktoken.helper";

function App() {
  const { fetchMasters } = useMaster();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setupAxiosInterceptor(navigate);
    checkTokenValidity(navigate, fetchMasters, pathname);
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

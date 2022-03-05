import React, { createContext, useState } from "react";
export const PageInfoContext = createContext();

export default function PageInfoProvider(props) {
  const [pageTitle, setPageTitle] = useState("");
  return (
    <PageInfoContext.Provider value={{ pageTitle, setPageTitle }}>
      {props.children}
    </PageInfoContext.Provider>
  );
}

import React, { createContext, useState } from "react";
export const PageInfoContext = createContext();

export default function PageInfoProvider(props) {
  const [pageTitle, setPageTitle] = useState("");
  const [breadCrumbPath, setBreadCrumbPath] = useState("");

  return (
    <PageInfoContext.Provider
      value={{ pageTitle, setPageTitle, breadCrumbPath, setBreadCrumbPath }}
    >
      {props.children}
    </PageInfoContext.Provider>
  );
}

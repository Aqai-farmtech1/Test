import React, { createContext, useState } from "react";
export const PageInfoContext = createContext();

export default function PageInfoProvider(props) {
  const [pageTitle, setPageTitle] = useState("");
  const [breadCrumbPath, setBreadCrumbPath] = useState("");
  const [transactionName, setTransactionName] = useState("");
  const [transactionLink, setTransactionLink] = useState("");

  return (
    <PageInfoContext.Provider
      value={{
        pageTitle,
        breadCrumbPath,
        transactionLink,
        transactionName,
        setPageTitle,
        setBreadCrumbPath,
        setTransactionLink,
        setTransactionName,
      }}
    >
      {props.children}
    </PageInfoContext.Provider>
  );
}

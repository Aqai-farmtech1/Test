import React, { createContext, useState } from "react";
export const PageInfoContext = createContext();

export default function PageInfoProvider(props) {
  const [pageTitle, setPageTitle] = useState("");
  const [formFields, setFormFields] = useState({});

  return (
    <PageInfoContext.Provider
      value={{ pageTitle, setPageTitle, formFields, setFormFields }}
    >
      {props.children}
    </PageInfoContext.Provider>
  );
}

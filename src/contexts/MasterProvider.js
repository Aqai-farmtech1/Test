import React, { createContext, useState } from "react";

export const MasterContext = createContext();

export default function MasterProvider(props) {
  const [stateMaster, setStateMaster] = useState([]);
  const [designationMaster, setDesignationMaster] = useState([]);
  return (
    <MasterContext.Provider
      value={{
        stateMaster,
        setStateMaster,
        designationMaster,
        setDesignationMaster,
      }}
    >
      {props.children}
    </MasterContext.Provider>
  );
}

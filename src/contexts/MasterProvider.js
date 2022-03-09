import React, { createContext, useState } from "react";
import { getAllFarmList } from "../api/farm.api";

import {
  getStateList,
  getDesignationList,
  getProductList,
  getDeviceTypeList,
} from "../api/master.api";
import tryCatch from "../helper/tryCatch.helper";

export const MasterContext = createContext();

export default function MasterProvider(props) {
  const [stateMaster, setStateMaster] = useState([]);
  const [designationMaster, setDesignationMaster] = useState([]);
  const [productMaster, setProductMaster] = useState([]);
  const [deviceTypeMaster, setDeviceTypeMaster] = useState([]);
  const [farmMaster, setFarmMaster] = useState([]);

  const fetchState = async (token) => {
    const [stateMasterResponse, stateMasterError] = await tryCatch(
      getStateList(token)
    );

    if (!stateMasterError) {
      setStateMaster(stateMasterResponse.data);
    } else {
      console.log(stateMasterError.response);
    }
  };

  const fetchDesignation = async (token) => {
    const [designationMasterResponse, designationMasterError] = await tryCatch(
      getDesignationList(token)
    );

    if (!designationMasterError) {
      setDesignationMaster(designationMasterResponse.data);
    } else {
      console.log(designationMasterError.response);
    }
  };

  const fetchProduct = async (token) => {
    const [productResponse, productError] = await tryCatch(
      getProductList(token)
    );

    if (!productError) {
      setProductMaster(productResponse.data);
    } else {
      console.log(productError.response);
    }
  };

  const fetchDeviceType = async (token) => {
    const [deviceTypeResponse, deviceTypeError] = await tryCatch(
      getDeviceTypeList(token)
    );

    if (!deviceTypeError) {
      setDeviceTypeMaster(deviceTypeResponse.data);
    } else {
      console.log(deviceTypeError.response);
    }
  };

  const fetchFarm = async (token) => {
    const [farmResponse, farmError] = await tryCatch(getAllFarmList(token));

    if (!farmError) {
      setFarmMaster(farmResponse.data);
    } else {
      console.log(farmError.response);
    }
  };

  const fetchMasters = async (token) => {
    fetchState(token);
    fetchProduct(token);
    fetchDesignation(token);
    fetchDeviceType(token);
    fetchFarm(token);
  };

  return (
    <MasterContext.Provider
      value={{
        stateMaster,
        designationMaster,
        productMaster,
        deviceTypeMaster,
        farmMaster,
        fetchMasters,
      }}
    >
      {props.children}
    </MasterContext.Provider>
  );
}

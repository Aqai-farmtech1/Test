import { useContext } from "react";
import { MasterContext } from "../contexts/MasterProvider";

const useMasters = () => {
  return useContext(MasterContext);
};

export default useMasters;

import { useContext } from "react";
import { PageInfoContext } from "../contexts/PageInfoContext";

const usePageInfo = () => {
  return useContext(PageInfoContext);
};

export default usePageInfo;

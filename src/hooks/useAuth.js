import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const useAuth = () => {
  console.log('Auth context', AuthContext);
  return useContext(AuthContext);
};

export default useAuth;

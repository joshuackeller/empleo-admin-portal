import { useContext } from "react";
import { AuthContext } from "../layout/AuthContextProvider";

const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuthContext;

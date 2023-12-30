import { useContext } from "react";
import { AuthContext } from "../layout/AuthContextProvider";

const useAuthContext = () => {
  console.log("trying context");
  const context = useContext(AuthContext);
  console.log("its too hard");
  return context;
};

export default useAuthContext;

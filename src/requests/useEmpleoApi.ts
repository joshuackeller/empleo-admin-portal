import axios from "axios";
import {
  ORGANIZATION_ID_KEY,
  TOKEN_KEY,
} from "@/src/layout/AuthContextProvider";

const useEmpleoApi = () => {
  let token, organization_id;

  if (typeof window !== "undefined") {
    token = localStorage.getItem(TOKEN_KEY);
    organization_id = localStorage.getItem(ORGANIZATION_ID_KEY);
  }

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: token || undefined,
      Organization: organization_id || undefined,
    },
  });
};

export default useEmpleoApi;

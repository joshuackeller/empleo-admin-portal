import axios from "axios";
import { TOKEN_KEY } from "@/src/layout/AuthContextProvider";

const useEmpleoApi = () => {
  let token;

  if (typeof window !== "undefined") {
    token = localStorage.getItem(TOKEN_KEY);
  }

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: token || undefined,
    },
  });
};

export default useEmpleoApi;

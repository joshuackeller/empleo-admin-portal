import axios from "axios";
import {
  ORGANIZATION_ID_KEY,
  TOKEN_KEY,
} from "@/src/layout/AuthContextProvider";

const useEmpleoApi = () => {
  let token, organizationId;

  if (typeof window !== "undefined") {
    token = localStorage.getItem(TOKEN_KEY);
    organizationId = localStorage.getItem(ORGANIZATION_ID_KEY);
  }

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: token || undefined,
      Organization: organizationId || undefined,
    },
  });

  api.interceptors.response.use(
    (value) => value,
    (error) => {
      if (
        error?.response?.data === "invalid token" ||
        error?.response?.data === "No authorization header"
      ) {
        if (typeof window !== "undefined") {
          window.location.href = "/auth/sign_in";
          token = localStorage.removeItem(TOKEN_KEY);
          organizationId = localStorage.removeItem(ORGANIZATION_ID_KEY);
          return;
        }
      } else if (
        error?.response?.data === "Invalid organization" ||
        error?.response?.data === "No organization header"
      ) {
        window.location.href = "/auth/organizations";
        organizationId = localStorage.removeItem(ORGANIZATION_ID_KEY);
        return;
      }
      throw error;
    }
  );

  return api;
};

export default useEmpleoApi;

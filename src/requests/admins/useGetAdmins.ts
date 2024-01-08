import { Admin } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import { useQuery } from "@tanstack/react-query";

const GetAdmins = async (): Promise<Admin[]> => {
  const api = useEmpleoApi();

  const { data } = await api.get("/admins");

  return data;
};

const useGetAdmins = () => {
  return useQuery({
    queryKey: ["ADMINS"],
    queryFn: GetAdmins,
  });
};

export default useGetAdmins;

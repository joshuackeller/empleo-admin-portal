import { Admin } from "@/src/utilities/interfaces";
import useEmpleoApi from "../useEmpleoApi";
import { useQuery } from "@tanstack/react-query";
import AdminQueryKeys from ".";

const GetAdmins = async (): Promise<Admin[]> => {
  const api = useEmpleoApi();

  const { data } = await api.get("/admins");

  return data;
};

const useGetAdmins = () => {
  return useQuery({
    queryKey: AdminQueryKeys.all,
    queryFn: GetAdmins,
  });
};

export default useGetAdmins;
